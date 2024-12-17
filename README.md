![Alt text](https://github.com/decaff1115/Streakify/blob/master/Streakify/client/src/assets/image/streakifyReadMe.png) <br>

# What is it?
This is a Habit Tracker application with Streaks and Progress Analytics created in compliance with the requirements for our Application Development (3105) class.



#
# Repository Setup Guide:
+ Setting Up XAMPP and Environment Variables   
+ Follow these steps to set up XAMPP and create a `.env` file for the project.  

## 1. Install and Start XAMPP  
1. **Download XAMPP**  
   - [Download XAMPP](https://www.apachefriends.org/index.html) and install it on your machine.  

2. **Start XAMPP**  
   - Open the XAMPP Control Panel.  
   - Start the **Apache** and **MySQL** modules by clicking the "Start" button.  
   - Ensure both modules turn green to confirm they are running.  

## 2. Set Up the MySQL Database  
1. Open the XAMPP Control Panel and click **Admin** next to MySQL. This opens **phpMyAdmin** in your browser.  
2. In phpMyAdmin:  
   - Click **New** on the left sidebar to create a new database.  
   - Enter the database name (e.g., `habit_tracker`) and click **Create**.  

## 3. Create a `.env` File  
The `.env` file will store sensitive environment variables for your project.  

1. Navigate to your project's **server** folder.  
2. Create a new file named `.env` (make sure it doesn’t have a `.txt` extension).  
3. Add the following variables to the `.env` file:  

   ```dotenv
   DB_HOST=your_host
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   DB_PORT=your_port
   JWT_SECRET=your_jwt_secret
 
---
# Cloning and Installing Dependecies

## 1. Create a Folder and Git Clone in Terminal
1. **Create a Folder**  
   - Open this folder in your VSCode.
   - Navigate to your terminal by pressing ctrl + tab + `  or clicking on the terminal tab at the upper left of your screen and selecting "New Terminal."
     
2. **Git Clone**  
   - Run the following command in the terminal
    ```in terminal
    git clone https://github.com/decaff1115/Streakify
## 2. Installing Dependencies and Running the Frontend and Backend
1. Navigate to the **client folder**
    ```terminal
    cd Streakify/Streakify/client
2. Install dependecies
    ```in terminal
    npm install
3. To run the **client**
    ```terminal
    npm run dev
4.  Navigate to the **server folder**
    ```in terminal
    cd..                             //to go outside the client folder
    cd server
5. Install dependecies
    ```in terminal
    npm install
6. To run the **server**
    ```terminal
    npm start
