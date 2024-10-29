package main

import (
	"react-go-app/config"
	"react-go-app/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database
	db := config.ConnectDB()

	// Initialize Gin router
	router := gin.Default()

	// Enable CORS for all origins
	router.Use(cors.Default())

	// Route to handle form submission
	router.POST("/api/users", controllers.CreateUser(db))

	// Define a route to handle fetching users
	router.GET("/api/users", controllers.GetUsers(db))

	// Start the server
	router.Run(":5000")
}
