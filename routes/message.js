const express = require('express');
const Router = express.Router();
const io = require('../socket');
const Message = require('../models/Message');
var ObjectId = require('mongoose').Types.ObjectId;

Router.post('/getmessages', (req, res) => {
    const { userId, guestId } = req.body;
    var allMessages = []
    Message.find({ to: ObjectId(guestId), from: ObjectId(userId) })
        .populate('to from')
        .then(messages => {
            if (!messages) {
                return res.json({ messages: "No messages found" })
            }
            allMessages = Object.assign([], messages);
            return Message.find({ to: ObjectId(userId), from: ObjectId(guestId) }).populate('to from')
        })
        .then(messages => {
            if (!messages) {
                return res.json({ message: "No messages from sender" })
            }
            var chatMessages = [...allMessages, ...messages]
            return res.json(chatMessages)
        })
        .catch(err => {
            return res.json(err);
        })
})

Router.post('/sendmessage', (req, res) => {
    const { to, from, message } = req.body;
    Message.create({
        to: to,
        from: from,
        message: message
    })
        .then(result => {
            return Message.find(result)
            .populate('to from')
        })
        .then(res => {
            console.log(res)
            io.getIO().emit('chat message', res);
            res.status(200).json(res)
        })
        .catch(err => {
            return res.json(err)
        })
})

module.exports = Router;