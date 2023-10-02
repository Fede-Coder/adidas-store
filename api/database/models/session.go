package models

import "github.com/google/uuid"

type Session struct {
	UserId uuid.UUID `gorm:"unique"`
	User   User
	Token  string `gorm:"not null; unique"`
}
