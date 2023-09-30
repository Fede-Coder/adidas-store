package models

import "github.com/google/uuid"

type User struct {
	Id        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey;unique"`
	FirstName string    `gorm:"not null"`
	LastName  string    `gorm:"not null"`
	Email     string    `gorm:"not null;unique"`
	Password  []byte    `gorm:"not null"`
}
