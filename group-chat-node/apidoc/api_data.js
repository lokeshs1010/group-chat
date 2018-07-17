define({ "api": [
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/group/chat/get/for/group",
    "title": "Get group chats.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"error\": false,\n  \"message\": \"All Chats Listed\",\n  \"status\": 200,\n  \"data\": [\n      {\n          \"senderName\": String,\n          \"senderId\": String,\n          \"receiverName\": String,\n          \"receiverId\": String,\n          \"message\": String,\n          \"chatId\": String,\n          \"createdOn\": Date,\n          \"modifiedOn\": Date\n      },\n      {\n          \"senderName\": String,\n          \"senderId\": String,\n          \"receiverName\": String,\n          \"receiverId\": String,\n          \"message\": String,\n          \"chatId\": String,\n          \"createdOn\": Date,\n          \"modifiedOn\": Date\n      }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Invalid Or Expired AuthorizationKey\",\n  \"status\": 404,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Group",
    "name": "GetApiV1GroupChatGetForGroup"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/group/getChatGroup",
    "title": "Get all Groups.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All Group Chats Details Found\",\n    \"status\": 200,\n    \"data\": [\n      {\n          \"roomId\": String,\n          \"roomName\": String,\n          \"creator\": String,\n          \"active\": Boolean,\n          \"createdOn\": Date,\n          \"ModifiedOn\": Date,\n      },\n      {\n          \"roomId\": String,\n          \"roomName\": String,\n          \"creator\": String,\n          \"active\": Boolean,\n          \"createdOn\": Date,\n          \"ModifiedOn\": Date,\n        }\n      ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Invalid Or Expired AuthorizationKey\",\n  \"status\": 404,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Group",
    "name": "GetApiV1GroupGetchatgroup"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/group/createGroup",
    "title": "Create Group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Group. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creator",
            "description": "<p>Name of the Group Creator. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Chat Room created\",\n \"status\": 200,\n \"data\": {\n     \"roomId\": String,\n     \"roomName\": String,\n     \"creator\": String,\n     \"active\": Boolean,\n     \"createdOn\": Date,\n     \"ModifiedOn\": Date,\n     \"_id\": String,\n     \"__v\": 0\n   }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n  {\n  \"error\": true,\n  \"message\": \"Invalid Or Expired AuthorizationKey\",\n  \"status\": 404,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Group",
    "name": "PostApiV1GroupCreategroup"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/group/:roomId/deleteGroup",
    "title": "Delete Group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"Deleted the chatRoom successfully\",\n   \"status\": 200,\n   \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"error\": true,\n   \"message\": \"No ChatRoom Found\",\n   \"status\": 404,\n   \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Group",
    "name": "PostApiV1GroupRoomidDeletegroup"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/group/shareLink",
    "title": "Share link of Group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user to whom you want to share your Group link. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "chatRoomId",
            "description": "<p>Id of Room . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "chatRoomName",
            "description": "<p>Name of Room . (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"error\": false,\n  \"message\": \"Mail Sent Successful\",\n  \"status\": 200,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Invalid Or Expired AuthorizationKey\",\n  \"status\": 404,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Group",
    "name": "PostApiV1GroupSharelink"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/group/:roomId/editGroup",
    "title": "Edit Group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Group. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "chatRoomId",
            "description": "<p>Id of the Group. (Pass in url) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"error\": false,\n  \"message\": \"Updated successfully!\",\n  \"status\": 200,\n  \"data\": {\n          \"roomId\": String,\n          \"roomName\": String,\n          \"creator\": String,\n          \"active\": Boolean,\n          \"createdOn\": Date,\n          \"ModifiedOn\": Date,\n      \"_id\": String,\n      \"__v\": 0\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n            \"error\": true,\n            \"message\": \"No Chat Room Found!\",\n            \"status\": 404,\n            \"data\": null\n          }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Group",
    "name": "PutApiV1GroupRoomidEditgroup"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/group/:roomId/markAsClose",
    "title": "Close Group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"error\": false,\n  \"message\": \"Chat Room has been marked as close\",\n  \"status\": 200,\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n          \"error\": true,\n          \"message\": \"No Chat Room Found!\",\n          \"status\": 404,\n          \"data\": null\n      }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Group",
    "name": "PutApiV1GroupRoomidMarkasclose"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "Forgot Password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n    \"error\": false,\n    \"message\": \"Mail Sent Successful!\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n            \"error\": true,\n            \"message\": \"Server Error!Sent Mail Failed.\",\n            \"status\": 500,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "Login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": String,\n        \"userDetails\": {\n            \"userId\": String,\n            \"firstName\": String,\n            \"lastName\": String,\n            \"email\": String,\n            \"mobileNumber\": Number,\n            \"hash\": String,\n            \"verified\": Boolean,\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"User has not Verified!\",\n        \"status\": 400,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "Logout.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Auth Token of the user. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n            \"error\": true,\n            \"message\": \"Error Occured!\",\n            \"status\": 500,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "Signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": String,\n        \"firstName\": String,\n        \"lastName\": String,\n        \"email\": String,\n        \"mobileNumber\": Number,\n        \"hash\": String,\n        \"verified\": Boolean,\n        \"createdOn\": Date,\n        \"_id\": String,\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n            \"error\": true,\n            \"message\": \"User has not Verified!\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/resetPassword",
    "title": "Reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user which is provided at email link by encrypting using btoa. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n    \"error\": false,\n    \"message\": \"Password changed successfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": String,\n        \"firstName\": String,\n        \"lastName\": String,\n        \"email\": String,\n        \"mobileNumber\": Number,\n        \"hash\": String,\n        \"verified\": Boolean,\n        \"createdOn\": Date,\n        \"_id\": String,\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"Error Occured!\",\n        \"status\": 500,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Users",
    "name": "PutApiV1UsersResetpassword"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/verifyEmail",
    "title": "Verify Email.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "hash",
            "description": "<p>hash which is provided in email link. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n    \"error\": false,\n    \"message\": \"User Verified Successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": String,\n        \"firstName\": String,\n        \"lastName\": String,\n        \"email\": String,\n        \"mobileNumber\": Number,\n        \"hash\": String,\n        \"verified\": Boolean,    \n        \"createdOn\": Date,\n        \"_id\": String,\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"User Not found\",\n        \"status\": 404,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Users",
    "name": "PutApiV1UsersVerifyemail"
  }
] });
