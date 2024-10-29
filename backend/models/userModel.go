package models

import (
	"fmt"

	"gorm.io/gorm"
)

type User struct {
	ID    uint   `gorm:"primaryKey;autoIncrement"`
	Name  string `gorm:"size:255;not null"`
	Email string `gorm:"size:255;unique;not null"`
}

func InsertUser(db *gorm.DB, user *User) error {
	// Use GORM's Create method to insert the user
	result := db.Create(user)
	if result.Error != nil {
		return fmt.Errorf("error inserting user: %v", result.Error)
	}
	return nil
}

// GetUsers retrieves all users from the database
func GetUsers(db *gorm.DB) ([]User, error) {
	var users []User
	result := db.Select("id, name, email").Find(&users)

	if result.Error != nil {
		return nil, fmt.Errorf("error fetching users: %v", result.Error)
	}

	return users, nil
}
