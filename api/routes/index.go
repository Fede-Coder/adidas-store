package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())

	//Auths
	api.Group("/auth").Route("/login", Login)

	//Products
	/*
		api.Group("/product").Route("/", Product)
	*/
}
