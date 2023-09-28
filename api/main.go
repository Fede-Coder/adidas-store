package main

import (
	"api/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()

	// Middleware
	app.Use(logger.New())

	routes.SetupRoutes(app)

	/* app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"text": "text",
		})
	}) */

	app.Listen(":3001")
}
