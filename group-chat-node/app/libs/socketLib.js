/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');

// To include events module
const events = require('events');
// Create an instance of event emitter
const eventEmitter = new events.EventEmitter();

const logger = require('./loggerLib.js');
const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib');

// For sending mails
var nodemailer = require('nodemailer');

const ChatModel = mongoose.model('Chat');


let setServer = (server) => {

    let allOnlineUsers = []

    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection', (socket) => {

        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");

        // code to verify the user and make him online

        socket.on('setUser',(authToken)=>{
            console.log("set-user called"+ authToken);
            tokenLib.verifyClaimWithoutSecret(authToken,(err,user)=>{
                if(err){
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else{
                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                   
                    let userObj = {userId:currentUser.userId,fullName:fullName}
                    allOnlineUsers.push(userObj)
                    allOnlineUsers=allOnlineUsers.filter((val,index)=>{
                        return allOnlineUsers.indexOf(val)==index;
                    });
                   
                    console.log(allOnlineUsers);
                     // setting room name
                     socket.room = 'edChat'
                     // joining chat-group room.
                     socket.join(socket.room)
                     myIo.emit('online-user-list',allOnlineUsers);
    
                 
                }
            });
    
           }); // end of listening set-user event


        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            // console.log(socket.connectorName);
            console.log(socket.userId);


            var removeIndex = allOnlineUsers.map(function(user) { return user.userId; }).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex,1)
            console.log(allOnlineUsers)
    
            myIo.emit('online-user-list',allOnlineUsers);
            socket.leave(socket.room)
            socket.disconnect(0);

        }) // end of on disconnect

        //Join a room
        socket.on('joinRoom', (data) => {
            socket.room = data.roomId;
            socket.join(socket.room, () => {
                console.log('joined room ' + data.roomId);
                myIo.to(data.roomId).emit('setJoinedRoom', data);
            });

        })

        socket.on('room-msg', (data) => {
            console.log("socket chat-msg called")
            console.log(data);
            data['chatId'] = shortid.generate()
            console.log(data);

            // event to save chat.
            setTimeout(() => {

                eventEmitter.emit('chat-save', data);

            }, 2000)
            socket.to(data.receiverId).broadcast.emit('receiveMsg', data);

        });


        socket.on('typing', (data) => {

            socket.to(data.roomId).broadcast.emit('userTyping', data);

        });
    });

}


// database operations are kept outside of socket.io code.

// saving chats to database.
eventEmitter.on('chat-save', (data) => {

    // let today = Date.now();

    let newChat = new ChatModel({

        chatId: data.chatId,
        senderName: data.senderName,
        senderId: data.senderId,
        receiverName: data.receiverName || '',
        receiverId: data.receiverId || '',
        message: data.message,
        createdOn: data.createdOn

    });

    newChat.save((err, result) => {
        if (err) {
            console.log(`error occurred: ${err}`);
        } else if (result == undefined || result == null || result == "") {
            console.log("Chat Is Not Saved.");
        } else {
            console.log("Chat Saved.");
            console.log(result);
        }
    });

}); // end of saving chat.


eventEmitter.on('WelcomeEmail', (data) => {
    console.log(data)

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
               user: 'hrishi0703@gmail.com',
               pass: 'zxcvbnm@np'
           }
    });


    const mailOptions = {
        from: 'hrishi0703@gmail.com', // sender address
        to: data.email, // list of receivers
        subject: 'Confirm your Email account',
        text: `Hi! ${data.name},
        Please Click on the link to verify your email.`,
        html: '<a href="http://localhost:4200/verify/'+data.hash+'">http://localhost:4200/' +data.hash+ '</a>'
    };
    console.log(mailOptions)
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)

        } else {
            console.log(info);

        }
    });
});


module.exports = {
    setServer: setServer,
    emitter: eventEmitter
}
