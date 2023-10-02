package app

import (
	"github.com/google/uuid"
)

type User struct {
	Id       uuid.UUID
	Name     string
	Last     string
	Email    string
	Avatar   string
	Verified bool
	Disabled bool
}
