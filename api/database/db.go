package database

import (
	"api/database/models"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dns := "host=" + os.Getenv("DB_HOST") + " user=" + os.Getenv("DB_USER") + " password=" + os.Getenv("DB_PASSWORD") + " dbname=" + os.Getenv("DB_DATABASE") + " port=" + os.Getenv("DB_PORT")
	connection, err := gorm.Open(postgres.Open(dns), &gorm.Config{})

	if err != nil {
		panic("Error connection with postgresql")
	}

	DB = connection

	//modelss := []interface{}{&models.User{}, &models.Session{}}
	//connection.AutoMigrate(modelss...)
	connection.AutoMigrate(&models.User{})
	connection.AutoMigrate(&models.Session{})

}
