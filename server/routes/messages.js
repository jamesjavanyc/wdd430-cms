const express = require('express');
const router = express.Router();
function responseError(res, error) {
    res.status(500).json({
        message: 'An error occurred',
        error: error
    });
}
const sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message');

router.get('/', (req, res, next) => {
    Message.find()
        // .populate('sender')
        .then(messages => {
            res.status(200).json({
                message: 'Messages fetched successfully',
                data: messages
            });
        })
        .catch(error => {
            console.log(error)
            responseError(res, error);
        });
}
);

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");
    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                data: createdMessage
            });
        })
        .catch(error => {
            console.log(error)
            responseError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            message.subject= req.body.subject,
            message.msgText= req.body.msgText,
            message.sender= req.body.sender
            Message.updateOne({ id: req.params.id }, message)
                .then(result => {
                    res.status(204).json({
                        message: 'Message updated successfully'
                    })
                })
                .catch(error => {
                    responseError(res, error);
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Message not found.',
                error: { message: 'Message not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            Message.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({ message: "Message deleted successfully" });
                })
                .catch(error => {
                    responseError(res, error);
                })
        })
        .catch(error => {
            responseError(res, error);
        });
});

module.exports = router;