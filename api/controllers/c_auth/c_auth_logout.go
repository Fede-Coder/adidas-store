package cauth

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

var LogoutUser = func(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "tkn_usr",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}
