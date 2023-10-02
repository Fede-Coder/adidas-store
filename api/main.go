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

	//Loading file .env
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	// Initial connection database
	database.Connect()

	// Setup fiber
	app := fiber.New()
	app.Use(logger.New(), cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:3000",
		AllowHeaders:     "Origin, X-Requested-With, Content-Type, Accept",
	}))

	// Setup routes
	routes.SetupRoutes(app)

	//Open server with port :3001
	app.Listen(":3001")
}
