package routes

import (
	c_auth "api/controllers/c_auth"

	"github.com/gofiber/fiber/v2"
)

func Register(router fiber.Router) {
	router.Post("/", c_auth.RegisterUser)
}

func Login(router fiber.Router) {
	router.Post("/", c_auth.LoginUser)
}
