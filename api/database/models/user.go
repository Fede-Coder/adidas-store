package models

import (
	"api/database/app"
	"time"

	"github.com/google/uuid"
)

type User struct {
	Id        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey;unique"`
	Name      string    `gorm:"not null"`
	Last      string    `gorm:"not null"`
	Email     string    `gorm:"not null;unique"`
	Password  []byte    `gorm:"not null"`
	Avatar    string    `gorm:"default:https://i.imgur.com/veqwMvk.jpg"`
	Verified  bool      `gorm:"default:true"`
	Disabled  bool      `gorm:"default:false"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (u *User) UserToUser() app.User {
	return app.User{
		Id:       u.Id,
		Name:     u.Name,
		Last:     u.Last,
		Email:    u.Email,
		Avatar:   u.Avatar,
		Verified: u.Verified,
		Disabled: u.Disabled,
	}
}
