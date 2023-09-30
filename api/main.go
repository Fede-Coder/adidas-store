package main

import (
	"api/database"
	"api/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	app := fiber.New()
	// Initial connection database
	database.Connect()
	// Middleware
	app.Use(logger.New(), cors.New(cors.Config{
		AllowCredentials: true,
	}))
	// Setup routes
	routes.SetupRoutes(app)
	//Open server with port :3001
	app.Listen(":3001")
}
