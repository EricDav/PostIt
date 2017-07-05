# PostIt

[![Coverage Status](https://coveralls.io/repos/github/EricDav/PostIt/badge.svg?branch=development)](https://coveralls.io/github/EricDav/PostIt?branch=development)  [![Build Status](https://travis-ci.org/EricDav/PostIt.svg?branch=development)](https://travis-ci.org/EricDav/PostIt)[![Code Climate](https://codeclimate.com/github/EricDav/PostIt/badges/gpa.svg)](https://codeclimate.com/github/EricDav/PostIt)
## Introduction
* https://post-it1.herokuapp.com
*  **`PostIt`** is a software that allows friends and colleagues create groups for              notification.
*  It has the following features;
  *  Login with username and Password
  *  Allows users to;
    *  create group
    *  add members to group they belong
    *  Post messages to group they belong
    *  Recieve messages

## Dependencies

### Back End Dependencies
*  This app's functionality depends on some Node packages including;
  *  **Express Js** - This framework helps is essential in the creation of  object relational models and it also handles routing on the back end.
  
## Front End Dependencies
*  **materialize** - The app's grid layout have been styled using this CSS framework

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
    info: server started on 8000
  ```
