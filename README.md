#Family Grocery List

##Problem:

The goal of the application is to create a tool that allows multiple people to use/edit/complete a list of tasks for a given need. A primary requirement is to have the list update in real time to be able to keep track of what's already been completed so that there is no duplication of efforts. 

##Solution:
The solution to this problem is a web application that allows users to login and keep track of a variety of lists where they can edit/delete/add new items to a list they have previous created. The application also updates in real time to provide the users with immediate feedback about whether something still needs to be done, it has been changed or deleted altogether. 

##Technologies Used:

####Node Backend with Express
Node is a strong backend environment that allows us to write Javascript code for the server. Express is the leading framework for implementing the functionality that is made possible by Node and together were a strong duo that could easily handle the backend for this application. **The express-generator tool was used to build out the original skeleton of the application.**

####React Frontend
React is a leading Javascript library for rendering views and is also a lot of fun to work with. It allows the use of reusable components and conditional rendering so it works well for creating fast, dynamic applications, especially for single page applications. It has the backing of many big companies like Facebook and Airbnb with a large community of support that only seems to be growing. **The create-react-app tool was used to scaffold the front end portion of the application.**

#### PostgreSQL with Sequelize ORM
The database chosen was PostgreSQL as I am most comfortable with it and felt it could get the job done well. It's a Relational Database Management System so uses tables to keep track of the various information required by the app. The Sequelize ORM allowed for querying that database in Javascript which makes life a little easier than doing straight SQL without affecting performance too much in this instance.

####WebSockets (i.e. Sockets.io)
The key component of this application was to make sure that the users could get real time updates of the task list. The decision here was between using HTTP requests to continually request the server for any updates to the database and using websockets that would in real time send information to the client only when there were updates. Websockets seemed to satisfy this condition in a more elegant and efficient way. Sockets.io is a well supported library for implementing this functionality and is very easy to get up and running. It also has a lot more supporting documentation that help with troubleshooting issues.

####JSON Web Tokens
Authentication is a key part in many applications and this app also required it. JSON web tokens allow for storing information on the client side browser that allow the server to authenticate a user when attempting to access protected routes. Given the fact that we separated out the front and back ends, this felt like a strong choice. The jsonwebtokens package was used for creating these tokens and the passport package was used to implement the authentication process as well as user creation. 

####Deployment (Netlify - Front End, Heroku - Back End)
Netlify was used to deploy the front end client as Heroku (my first choice) had a difficult time with the React framework and required quite a bit of configuration to make it happen. Netlify worked right away for deployment and with no visible downsides. Heroku was used for the backend as it deployed the backend of this application without any issues and is a big member of the application hosting community.

####If I had more time...
Multiple users accessing a single list is key to collaboratively tackling the tasks. While a collaborator model was added to the project to deal with multiple users associated with one list, the application currently doesn't include the option to add a user. I would look to functionality to make that easy for the user. 

I would also look to able to add things like due dates to task items as well as add view functionality for individual list items that could provide more details about who added the item, comments about the task, etc.

