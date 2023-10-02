package cauth

import (
	"api/database"
	"api/database/models"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

var RegisterUser = func(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if data["name"] == "" || data["last"] == "" || data["email"] == "" || data["password"] == "" || data["repeatPassword"] == "" {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Name, Last, Email and Password are required.",
		})
	}

	if data["password"] != data["repeatPassword"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Password do not match!",
		})
	}

	var user models.User
	if err := database.DB.Where("email = ?", data["email"]).First(&user).Error; err == nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Email in use.",
		})
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user = models.User{
		Name:     data["name"],
		Last:     data["last"],
		Email:    data["email"],
		Password: password,
	}

	database.DB.Create(&user)

	/* res := database.DB.Create(&user)

	if res.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": res.Error,
		})
	} */

	return c.JSON(fiber.Map{
		"message": "User created.",
	})
}
