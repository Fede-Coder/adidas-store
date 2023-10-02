package cauth

import (
	"api/database"
	"api/database/models"
	"errors"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var LoginUser = func(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if data["email"] == "" || data["password"] == "" {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Email and Password are required.",
		})
	}

	var user models.User
	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.Id == uuid.Nil {
		c.Status(200)
		return c.JSON(fiber.Map{
			"message": "Incorrect username or password.",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(200)
		return c.JSON(fiber.Map{
			"message": "Incorrect username or password.",
		})
	}

	claims := jwt.RegisteredClaims{
		Issuer:    user.Id.String(),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
	}

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := jwtToken.SignedString([]byte(os.Getenv("JWT_PRIVATE_KEY_AUTH")))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	var session models.Session
	CreateOrUpdateSession(token, &user, &session)

	cookie := fiber.Cookie{
		Name:     "tkn_usr",
		Value:    token,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
		Secure:   true,
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"token": token,
	})
}

func CreateOrUpdateSession(token string, user *models.User, session *models.Session) error {
	if err := database.DB.Where("user_id = ?", user.Id).First(&session).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			session = &models.Session{
				UserId: user.Id,
				Token:  token,
			}
			if err := database.DB.Create(&session).Error; err != nil {
				return err
			}
		} else {
			return err
		}
	} else {
		if err := database.DB.Model(&session).Where("user_id = ?", user.Id).Update("token", token).Error; err != nil {
			return err
		}
	}
	return nil
}
