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
    npm install @vitejs/plugin-react
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
---
# Streakify Navigation Tutorial  

This guide will walk you through the features of Streakify and how to navigate its interface effectively.  

---

## 1. User Management and Habits Tab  
- Located on the **left sidebar**, this section contains your **Username** and the **Habits Tab**.  

### 1.1. Username  
- Click on your **Username** to access profile management.  

### 1.2. Habits Tab  
- The **Habits Tab** displays all the habits you have added.  

---

## 2. Add Habit Button  
- Click the **+** button located at the **upper right corner** of the screen to add a new habit.  

---

## 3. Fill Out the Habit Form  
- Complete the habit form with the required details.  

---

## 4. Save Your Habit  
- Click **Save** to create your new habit successfully!  

---

## 5. Created Habit Tab  

The Created Habit Tab allows you to manage your habits:  

### 5.1. Delete Button  
- Use the **Delete button** to remove a habit you no longer need.  

### 5.2. Edit Button  
- Click the **Edit button** to modify an existing habit.  

### 5.3. Progress Button  
- The **Progress button** redirects you to a detailed progress page for the selected habit.  

---

## 6. Progress Page  

The Progress Page provides an overview of your selected habit's progress, goals, and tracking options.  

### Features on the Progress Page:  
1. **Reset Progress**  
   - Resets the checked days of the week for the habit.  

2. **Current Streak**  
   - Displays your current streak for the habit.  

3. **Progress Bar**  
   - Shows your progress for the current week, helping you stay on track with your goal.  

---

By following this tutorial, you should be able to navigate Streakify confidently and make the most out of its features!  

