# Euphony
[Euphony](https://euphonysound.herokuapp.com/), a place to listen to tunes! A clone of SoundCloud where you are able to upload music and comment on songs.

## Technologies
This app makes use of the following technologies:
- Express.js
- React/Redux
- Javascript
- Sequelize
- PostgreSQL

## Features
This is the home page of Euphony which will show you the 20 most recent songs as well as a search bar where you can search for any song!
![image](https://user-images.githubusercontent.com/72574258/164094348-d2003d62-5418-4cfe-8593-24868f71f0ba.png)

In Euphony you will be able to upload, edit, and delete songs as well as comments!
![image](https://user-images.githubusercontent.com/72574258/164094361-f779a993-a56b-44bc-bafa-b29fc421936c.png)


## Installation
1. Clone this repo.
    * `git clone https://github.com/ljmurill/Euphony.git`

2. Install dependencies from root directory.  
    * `npm install`

3. Create POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
    * `CREATE USER <name> WITH CREATEDB PASSWORD <'password'>`

4. Create a .env file in the backend directory based on the .env.example foound within the respective directory.
5. Enter your username and password information that you just created into your .env file along with your desired database name. Make sure to have a secure combination of characters for your JWT_SECRET, and your desired PORT (preferably 5000).
6. Add the following proxy to your package.json file within your frontend directory, replacing or keeping the 5000 port to match your PORT configuration found in your .env file.
    * `"proxy": "http://localhost:5000"`

7. Create Database, Migrate, and Seed models.
    * `npx dotenv sequelize db:create`
    * `npx dotenv sequelize db:migrate`
    * `npx dotenv sequelize db:seed:all`

8. Start the services in the backend directory.
    * `npm start`

9. Start the services in the frontend directory, which should open the project in your default browser. If not, navigate to http://localhost3000.
    * `npm start`

10. Once your on the localhost, you must Sign up or Login by using the Demo User button in order to use the websites features. 
11. Once logged in you can upload a song by clicking the upload button which will take you to a upload form which will require a title name and a audio url of your choice, optionally you can also upload any image of your choice by pasting the image link address.
12. You can view the song you just posted or any songs that were already posted by just clicking on them on the home page, this will take you to a new page where you will be able to edit or delete the song if you are the User that posted it. 
13. You will also be able to comment and edit or delete your comment on the same page. 



## Happy Browsing!
