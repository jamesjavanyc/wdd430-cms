const express = require('express');
const router = express.Router();
const {responseError} = require("./utils")

const Message = require('../models/message');

router.get('/', (req, res, next) => {
    Message.find()
        .populate('sender')
        .then(messages => {
            res.status(200).json({
                message: 'Messages fetched successfully',
                data: messages
            });
        })
        .catch(error => {
            responseError(res, error);
        });
}
);

router.post('/', (req, res, next) => {

    const message = new Message({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                data: createdMessage
            });
        })
        .catch(error => {
            responseError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            message.name = req.body.name;
            message.description = req.body.description;
            message.url = req.body.url;
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