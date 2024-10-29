package controllers

import (
	"net/http"
	"react-go-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// CreateUser is the controller to handle user creation
func CreateUser(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User

		// Parse JSON from the request body
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Insert user into the database using GORM
		if err := models.InsertUser(db, &user); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "User created successfully!",
			"id":      user.ID, // Send back the generated ID
		})
	}
}

// GetUsers is the controller to handle retrieving users
func GetUsers(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		users, err := models.GetUsers(db)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"users": users})
	}
}
