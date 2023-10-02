package cuser

import (
	"api/database"
	"api/database/models"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var GetUser = func(c *fiber.Ctx) error {
	cookie := c.Cookies("tkn_usr")

	if cookie == "" {
		c.Status(403)
		return c.JSON(fiber.Map{
			"message": "Session expired.",
		})
	}

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

	var user models.User
	database.DB.Where("id = ?", session.UserId).First(&user)

	return c.JSON(user.UserToUser())
}

var UpdateUser = func(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if data["name"] == "" || data["last"] == "" {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Name and Last are required.",
		})
	}

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

	var user models.User

	if err := database.DB.Model(&user).Where("id = ?", session.UserId).Updates(models.User{Name: data["name"], Last: data["last"]}).Error; err != nil {
		log.Println(err)
	}
	c.Status(200)
	return c.JSON(fiber.Map{
		"message": "User updated.",
	})

}
