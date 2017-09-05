# PostIt

[![Coverage Status](https://coveralls.io/repos/github/EricDav/PostIt/badge.svg?branch=development)](https://coveralls.io/github/EricDav/PostIt?branch=development)  [![Build Status](https://travis-ci.org/EricDav/PostIt.svg?branch=development)](https://travis-ci.org/EricDav/PostIt)[![Code Climate](https://codeclimate.com/github/EricDav/PostIt/badges/gpa.svg)](https://codeclimate.com/github/EricDav/PostIt)
## Introduction
* https://post-it1.herokuapp.com
*  **`PostIt`** is a software that allows friends and colleagues create groups for  notification.

###### PostIt Application
*   Create an account from Apllication
*   Create an account with Google+ 
*   Login with your credentials
*   Login with Google+
*   Create a group
*   Group owner can edit Group
*   Group owner can delete his/her group
*   Group member can leave group
*   Search for other users in the application
*   Add members to group
*   Post message to group with piority level such as `normal`, `urgent` and  `critical`
*   Recieve app notification for `normal` messages
*   Recieve app and email notification for `urgent` messages 
*   Recieve app, email and sms notification `critical` messages
*   Edit your profile
*   View online and offline users in a group
*   View members that have read a particular message
*   Reset password
*   change password
*   View groups
*   Group owner can delete any message in his/her group  - Upcoming
*   Group members can delete his/her message - Upcoming
*   Update messages sent out - Upcoming
*   Categorize group into puplic and private - Upcoming
*   Join public groups - Upcoming
*   send direct messages to members in a group - Upcoming
*   Logout

## Technologies Used
- **[JavaScript ES6](http://es6-features.org/)** - Codes were written in javascript to enhance HTML pages.
- **[ReactJS](https://facebook.github.io/react/)** - React is an open-source JavaScript library for building user interfaces.
- **[NodeJS](https://nodejs.org/)** - Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
- **[ExpressJS](https://expressjs.com/)** - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. I used this framework for routing.
- **[PostgreSQL](https://www.postgresql.org/)** - Postgres is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards compliance.
- **[Sequelize](http://docs.sequelizejs.com/)** - Sequelize is a promise-based ORM for Node.js which supports the dialects of PostgreSQL and features solid transaction support, relations, read replication and more.

#### Routes
* POST `/api/user/signup` Use this route to create an account. The following fields are required:
  * `name`  The user fullname
  * `email`     Email address of the new user
  * `password` users password at least 8 characters include at least one digit and one alphabet
  * `userName` user Username

* POST `/api/user/signin` Use this route to sign in to the application. The following fields are required:
  * `userName` User userName
  * `password` User password

* POST `/api/group` Use this route to create a new group. The following fields are required:
  * `Name`  The Name of the group
  * `Description`     A description or of the purpose of the group
* POST `/api/group/<groupId>/user` Use this route to add a user to an existing group
  * `memberId` The `id` of the member to be added


* POST `/api/group/<groupId>/message` Use this route to post a message to a group
  * `message` The body of the message to be posted to the group
  * `postId` The name of the group the message is being posted to

* GET `/api/group/<groupId>/messages` Use this route retrieve all the massages in a particular group
* GET `/api/group/<groupId>/members` Use this route to retrieve all the members in a group
* GET `/api/allUsers` Use this route to retrieve all registered members
* GET `/api/user/:userId/groups` Use this route to retrieve all the groups a particular user belongs to
* GET `/api/group/:groupId/nonMembers` Use this route to retrieve all registered members that are not a member of    a group

* DELETE `/api/group/:groupId/delete` Use this route to delete a group with its groupId

### How to Contribute
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request describing the feature(s) you have added
6. Include a `feature.md` readme file with a detailed description of the feature(s) you have added, along with clear instructions of how to use the features(s) you have added. This readme file will be reviewed and included in the original readme if feature is approved.

Ensure your codes follow the [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)


## Installation and setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
  *  Using SSH;

    >`git clone git@github.com:EricDav/PostIt.git`

  *  Using HTTP;

    >`https://github.com/EricDav/PostIt.git`

*  Navigate to the repo's folder on your computer
  *  `cd PostIt`
*  Install the app's dependencies. For best results, using a node package manager.
  *  `npm install`

    >In order to use app dependencies, you need to install it through **npm**. You also need to have **node** installed on your system.
* Run test
  *  `npm tests`

* Run the app
  *  `npm start`
  *  Running the command above will produce output that's similar to the sample below.
  ```
    > PostIt@1.0.0 start C:\Users\DAVID\Desktop\PostIt
    > nodemon --watch server --exec babel-node -- app.js

    [nodemon] 1.11.0
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: C:\Users\DAVID\Desktop\PostIt\server/**/*
    [nodemon] starting `babel-node app.js`
    info: server started on 9000
  ```
