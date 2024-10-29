package config

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "dbpass123"
	DB_NAME     = "user_db"
	DB_HOST     = "localhost"
	DB_PORT     = "5432"
)

// ConnectDB connects to PostgreSQL using GORM
func ConnectDB() *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	fmt.Println("Database connected!")
	return db
}
