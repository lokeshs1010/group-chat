/**
 * module dependencies.
 */
const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')


var nodemailer = require('nodemailer');
/* Models */
const ChatModel = mongoose.model('Chat')
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')
const roomModel = mongoose.model('Room')


/**
 * function to retrieve chat of the group.
 * params: chatRoom, skip.
 */
let getChatsForGroup = (req, res) => {
  // function to validate params.
  let validateParams = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.query.receiverId)) {
        logger.info('parameters missing', 'getChatForGroup handler', 9)
        let apiResponse = response.generate(true, 'parameters missing.', 403, null)
        reject(apiResponse)
      } else {
        resolve()
      }
    })
  } // end of the validate Params function.

  // function to get chats.
  let findChats = () => {
    return new Promise((resolve, reject) => {
      // creating find query.
      let findQuery = {
        'receiverId':req.query.receiverId
      }

      ChatModel.find(findQuery)
        .select('-_id -__v ')
        .sort('-createdOn')
        .skip(parseInt(req.query.skip) || 0)
        .lean()
        .limit(10)
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'Chat Controller: getChatsForGroup', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No Chat Found', 'Chat Controller: getChatsForGroup')
            let apiResponse = response.generate(true, 'No Chat Found', 404, null)
            reject(apiResponse)
          } else {
            console.log('chat found')
            resolve(result)
          }
        })
    })
  } // end of the findChats function.

  // making promise call.
  validateParams()
    .then(findChats)
    .then((result) => {
      let apiResponse = response.generate(false, 'All Chats For Group Listed', 200, result)
      res.send(apiResponse)
    })
    .catch((error) => {
      res.send(error)
    })
} // end of the getGroupChat function.

let createGroup=(req,res)=>{
  let RoomCreation=()=>{
      return new Promise((resolve, reject) => {
          if (check.isEmpty(req.body.name) || check.isEmpty(req.body.creator)) {
              let apiResponse = response.generate(true, 'Parameters are missing', 403, null)
              res.send(apiResponse)
          }
          else{
              let newRoom = new roomModel({
                  roomId: shortid.generate(),
                  roomName:req.body.name,
                  creator:req.body.creator,
                  createdOn: time.now(),
                  ModifiedOn:time.now()
              });
             
              newRoom.save((err, newRoom) => {
                  if (err) {
                      console.log(err)
                      logger.error(err.message, 'chatController: createGroup', 10)
                      let apiResponse = response.generate(true, 'Failed to create new chat Group', 500, null)
                      reject(apiResponse)
                  } else {
                      let newRoomObj = newRoom.toObject();
                      newRoomObj.creatorId=req.body.creatorId;
                      resolve(newRoomObj)
                  }
              })
          }//else part end

      });

  }//end room creation

  

  RoomCreation()
  .then((resolve) => {
      let apiResponse = response.generate(false, 'Chat Room is created', 200, resolve)
      res.send(apiResponse)
  })
  .catch((err) => {
      console.log(err);
      res.send(err);
  })

}

let getChatGroup=(req,res)=>{
  roomModel.find({'active':true})
      .select('-__v -_id')
      .lean()
      .exec((err, result) => {
          if (err) {
              console.log(err)
              logger.error(err.message, 'chat Controller: getChatGroup', 10)
              let apiResponse = response.generate(true, 'Failed To Find Chat Groups', 500, null)
              res.send(apiResponse)
          } else if (check.isEmpty(result)) {
              logger.info('No chatGroup Found', 'Chat Controller: getChatGroup')
              let apiResponse = response.generate(true, 'No chatGroup Found', 404, null)
              res.send(apiResponse)
          } else {
              let apiResponse = response.generate(false, 'All Group Chats Details Found', 200, result)
              res.send(apiResponse)
          }
      })
}


let shareLink=(req,res)=>{
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
        auth: {
               user: 'hrishi0703@gmail.com',
               pass: 'zxcvbnm@np'
           }
     });
   
 
 const mailOptions = {
  from: 'hrishi0703@gmail.com', // sender address
  to: req.body.email, // list of receivers
  subject: 'Chat Chat', // Subject line
  html: "<p>Hi!,<br>Let\'s do a Group Chat.<a href='http://localhost:4200/group/"+req.body.roomId+"/"+req.body.roomName+"'>Click here</a> to Join!</p>"
 
 };
 console.log(mailOptions)
 transporter.sendMail(mailOptions, (err, info) => {
  if(err){
    console.log(err);
    logger.error('Mail is not sent', 'User Controller: shareLink', 10)
    let apiResponse = response.generate(true, 'Server Error! Mail is not sent.', 500, null)
    res.send(apiResponse)

    
  }
  else{
    console.log(info);
    logger.error('Mail is Sent', 'User Controller: shareLink', 10)
      let apiResponse = response.generate(false, 'Mail is Sent', 200, null)
      res.send(apiResponse)
  }
 });
}

// 
let editGroup= (req, res) => {
  if (check.isEmpty(req.params.roomId)) {

      console.log('Room Id should be passed')
      let apiResponse = response.generate(true, 'Room Id Id is missing', 403, null)
      res.send(apiResponse)
  }
  else{
      
      roomModel.findOne({ 'roomId': req.params.roomId })
      .exec((err,result)=>{

          if(err){
              console.log(err)
              logger.error(err.message, 'chat Controller: editGroup', 10)
              let apiResponse=response.generate(true,"Error Occured!",500,null);
              res.send(apiResponse)
          }
          else if (check.isEmpty(result)) {
              console.log('No Room Found')
              logger.info('No Room Found', 'Chat Controller: editChat',5)
              let apiResponse=response.generate(true,"No Room Found!",404,null);
              res.send(apiResponse)
             
          }
          else{
              result.roomName=req.body.name;
              result.save((error,resul)=>{
                  if (error) {
                      console.log(error)
                      logger.error(err.message, 'Chat Controller: editChat', 10)
                      let apiResponse=response.generate(true,"Error Occured!",500,null);
                      res.send(apiResponse)
                  }
                  else {
                      console.log("Edited successfully")
                      logger.info(' Updated Successfully!', 'User Controller: editUser',5)
                      let apiResponse=response.generate(false,"Updated successfully!",200,resul);
                      res.send(apiResponse)
  
                  }
              });
          }

      });
  }
}//edit functionn end

//Delete group
let deleteGroup = (req, res) => {
  if (check.isEmpty(req.params.roomId)) {

      console.log('Room Id should be passed')
      let apiResponse = response.generate(true, 'Room Id is missing', 403, null)
      res.send(apiResponse)
  }
  else{
  roomModel.remove({ 'roomId': req.params.roomId })
  .exec((err, result) => {
      if (err) {
          console.log(err)
          logger.error(err.message, 'Chat Controller: deleteGroup', 10)
          let apiResponse = response.generate(true, 'Failed To delete Room', 500, null)
          res.send(apiResponse)
      } else if (result.n == 0) {
          logger.info('No Room Found', 'Chat Controller: deleteGroup')
          let apiResponse = response.generate(true, 'No Room Found', 404, null)
          res.send(apiResponse)
      } else {
          let apiResponse = response.generate(false, 'Deleted the Room successfully', 200, null)
          res.send(apiResponse)
      }
  });// end user model find and remove

  }
}//end delete function

//close a room method
let closeGroup=(req,res)=>{
  // function to validate params.
  let validateParams = () => {
      return new Promise((resolve, reject) => {
        if (check.isEmpty(req.params.roomId)) {
          logger.info('parameter missing', 'closeGroup', 10)
          let apiResponse = response.generate(true, 'parameter missing.', 403, null)
          reject(apiResponse)
        } else {
          resolve()
        }
      })
    } // end of the validateParams function.
  
    // function to mark chat as seen.
    let modifyChatRoom = () => {
      return new Promise((resolve, reject) => {
        let findQuery = {
          roomId: req.params.roomId
        }
  
        let updateQuery = {
           active:false
        }
  
        roomModel.update(findQuery, updateQuery, {multi: true})
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'Chat Controller: CloseGroup', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            reject(apiResponse)
          } else if (result.n === 0) {
            logger.info('No Room Found', 'Chat Controller: Close Group')
            let apiResponse = response.generate(true, 'No Room Found', 404, null)
            reject(apiResponse)
          } else {
            console.log('Room found and updated.')
  
            resolve(result)
          }
        })
      })
    } // end of the modifyChat function.
  
    // making promise call.
    validateParams()
      .then(modifyChatRoom)
      .then((result) => {
        let apiResponse = response.generate(false, 'Chat Room has been marked as close', 200, null)
        res.send(apiResponse)
      })
      .catch((error) => {
        res.send(error)
      })

}

/**
 * exporting functions.
 */
module.exports = {
  getChatsForGroup: getChatsForGroup,
  createGroup: createGroup,
  getChatGroup: getChatGroup,
  shareLink: shareLink,
  editGroup: editGroup,
  deleteGroup: deleteGroup,
  closeGroup: closeGroup
}
