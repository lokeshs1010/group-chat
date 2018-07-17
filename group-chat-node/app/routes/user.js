const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const hash = require("./../middlewares/hash")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    app.get(`${baseUrl}/view/all`, userController.getAllUser);

    app.post(`${baseUrl}/signup`, hash.hash, userController.signUpFunction);
    /**
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup Signup.
     *
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastName  Last Name of the user. (body params) (required)
     * @apiParam {string} email     Email of the user. (body params) (required)
     * @apiParam {string} password  Password of the user. (body params) (required)
     * @apiParam {string} mobileNumber  Mobile Number of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
        {
            "error": false,
            "message": "User created",
            "status": 200,
            "data": {
                "userId": String,
                "firstName": String,
                "lastName": String,
                "email": String,
                "mobileNumber": Number,
                "hash": String,
                "verified": Boolean,
                "createdOn": Date,
                "_id": String,
                "__v": 0
            }
        }
        @apiErrorExample {json} Error-Response:
        *
        * {
            "error": true,
            "message": "User has not Verified!",
            "status": 400,
            "data": null
        }
    */

    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login Login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
          {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": String,
                "userDetails": {
                    "userId": String,
                    "firstName": String,
                    "lastName": String,
                    "email": String,
                    "mobileNumber": Number,
                    "hash": String,
                    "verified": Boolean,
                }
            }
        }
  
     @apiErrorExample {json} Error-Response:
    *
    * {
        "error": true,
        "message": "User has not Verified!",
        "status": 400,
        "data": null
    }
    */

    app.post(`${baseUrl}/logout`, userController.logout);
    /**
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout Logout.
     *
     * @apiParam {string} authToken Auth Token of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
        @apiErrorExample {json} Error-Response:
    *
    * {
            "error": true,
            "message": "Error Occured!",
            "status": 500,
            "data": null
        }
    */

    app.put(`${baseUrl}/verifyEmail`, userController.verifyEmail);
    /**
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/verifyEmail Verify Email.
     *
     * @apiParam {string} hash hash which is provided in email link. (body params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
          {
            "error": false,
            "message": "User Verified Successfully",
            "status": 200,
            "data": {
                "userId": String,
                "firstName": String,
                "lastName": String,
                "email": String,
                "mobileNumber": Number,
                "hash": String,
                "verified": Boolean,    
                "createdOn": Date,
                "_id": String,
                "__v": 0
            }
        }
  
     @apiErrorExample {json} Error-Response:
    *
    * {
        "error": true,
        "message": "User Not found",
        "status": 404,
        "data": null
    }
    */

    app.put(`${baseUrl}/:userId/edit`, userController.editUser);

    app.post(`${baseUrl}/forgotPassword`, userController.forgotPassword);
    /**
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgotPassword Forgot Password.
     *
     * @apiParam {string} email Email of the user. (body params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
          {
            "error": false,
            "message": "Mail Sent Successful!",
            "status": 200,
            "data": null
        }
  
     @apiErrorExample {json} Error-Response:
    *
    * {
            "error": true,
            "message": "Server Error!Sent Mail Failed.",
            "status": 500,
            "data": null
        }

    */

    app.put(`${baseUrl}/resetPassword`, userController.resetPassword);
    /**
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/resetPassword Reset password.
     *
     * @apiParam {string} email Email of the user which is provided at email link by encrypting using btoa. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
          {
            "error": false,
            "message": "Password changed successfully!",
            "status": 200,
            "data": {
                "userId": String,
                "firstName": String,
                "lastName": String,
                "email": String,
                "mobileNumber": Number,
                "hash": String,
                "verified": Boolean,
                "createdOn": Date,
                "_id": String,
                "__v": 0
            }
        }
  
     @apiErrorExample {json} Error-Response:
    *
    *{
        "error": true,
        "message": "Error Occured!",
        "status": 500,
        "data": null
    }

    */

    app.post(`${baseUrl}/:userId/delete`, userController.deleteUser);
}
