package routes

import "github.com/gofiber/fiber/v2"

type Person struct {
	Name string `json:"name"`
	Pass string `json:"pass"`
}

func Login(router fiber.Router) {
	router.Post("/", func(c *fiber.Ctx) error {
		/* p := new(Person)
		if err := c.BodyParser(p); err != nil {
			return err
		}
		return c.Send([]byte(p.Name)) */
		return c.SendString("Testing")
	})
}
