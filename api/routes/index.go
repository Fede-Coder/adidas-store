package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())

	//Auths
	auth := api.Group("/auth")
	auth.Route("/login", Login)
	auth.Route("/register", Register)
	auth.Route("/logout", Logout)

	//User
	user := api.Group("/user")
	user.Route("/", GetUser)
	user.Route("/upload", UpdateAvatar)
	user.Route("/edit", UpdateUser)
}
