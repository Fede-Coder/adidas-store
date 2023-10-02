package routes

import (
	c_user "api/controllers/c_user"
	"api/database"
	"api/database/models"
	"context"
	"encoding/hex"
	"log"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func GetUser(router fiber.Router) {
	router.Post("/", c_user.GetUser)
}

func UpdateUser(router fiber.Router) {
	router.Post("/", c_user.UpdateUser)
}

func UpdateAvatar(router fiber.Router) {
	router.Post("/", func(c *fiber.Ctx) error {

		cookie := c.Cookies("tkn_usr")

		var session models.Session
		database.DB.Where("token = ?", cookie).First(&session)

		if session.Token == "" {
			c.Status(403)
			return c.JSON(fiber.Map{
				"message": "Session expired.",
			})
		}

		token, err := jwt.Parse(session.Token, func(t *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_PRIVATE_KEY_AUTH")), nil
		})

		if err != nil || !token.Valid {
			c.Status(fiber.StatusUnauthorized)
			return c.JSON(fiber.Map{
				"message": "Session expired.",
			})
		}

		file, err := c.FormFile("avatar")
		if err != nil {
			return err
		}

		if file.Header.Get("Content-Type") != "image/png" && file.Header.Get("Content-Type") != "image/jpeg" {
			c.Status(415)
			return c.JSON(fiber.Map{
				"message": "Invalid file type. Please upload a valid file (.png .jpg .jpeg) and try again.",
			})
		}

		maxFileSize := int64(2 * 1024 * 1024)
		if file.Size > maxFileSize {
			c.Status(413)
			return c.JSON(fiber.Map{
				"message": "File is too large. Please upload a file smaller than 2MB and try again.",
			})
		}

		//Open file
		f, err := file.Open()
		if err != nil {
			return err
		}

		upload := uploadFile(file, f)

		var user models.User

		if err := database.DB.Where("id = ?", session.UserId).First(&user); err != nil {
			log.Println(err)
		}

		oldAvatar := user.Avatar

		if err := database.DB.Model(&user).Where("id = ?", session.UserId).Update("avatar", upload.Location).Error; err != nil {
			log.Println(err)
		}

		deleteFile(filepath.Base(oldAvatar))

		return c.JSON(fiber.Map{
			"Url": upload.Location,
		})
	})
}

func uploadFile(file *multipart.FileHeader, f multipart.File) *manager.UploadOutput {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		panic(err)
	}

	client := s3.NewFromConfig(cfg)

	uploader := manager.NewUploader(client)

	genUuid := uuid.New()
	result, err := uploader.Upload(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String("adidas-store-fede-s3"),
		Key:    aws.String(hex.EncodeToString(genUuid[:]) + filepath.Ext(file.Filename)),
		Body:   f,
		ACL:    "public-read",
	})

	if err != nil {
		panic(err)
	}

	return result
}

func deleteFile(file string) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		panic(err)
	}

	client := s3.NewFromConfig(cfg)

	_, err2 := client.DeleteObject(context.TODO(), &s3.DeleteObjectInput{
		Bucket: aws.String("adidas-store-fede-s3"),
		Key:    aws.String(file),
	})

	if err2 != nil {
		log.Println(err)
	}
}
