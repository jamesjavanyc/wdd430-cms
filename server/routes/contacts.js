const express = require('express');
const {responseError} = require("./utils")
const router = express.Router();
const Contact = require('../models/contact');

router.get('/', (req, res, next) => {
    Contact.find()
        .populate('group')
        .then(contacts => {
            res.status(200).json({
                message: 'Contacts fetched successfully',
                data: contacts
            });
        })
        .catch(error => {
            responseError(res, error);
        });
}
);


router.get('/:id', (req, res, next) => {
    Contact.findOne({
        "id": req.params.id
    })
        .populate('group')
        .then(contact => {
            res.status(200).json({
                message: 'Contact fetched successfully',
                data: contact
            });
        })
        .catch(error => {
            responseError(res, error);
        })
})

router.post('/', (req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        group: req.body.group
    });
    if (contact.group && contact.group.length > 0) {
        for (let groupContact of contact.group) {
            groupContact = groupContact._id;
        }
    }

    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: 'Contact added successfully',
                data: createdContact
            });
        })
        .catch(error => {
            responseError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            contact.name = req.body.name;
            contact.description = req.body.description;
            contact.url = req.body.url;
            Contact.updateOne({ id: req.params.id }, contact)
                .then(result => {
                    res.status(204).json({
                        message: 'Contact updated successfully'
                    })
                })
                .catch(error => {
                    responseError(res, error);
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Contact not found.',
                error: { contact: 'Contact not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            Contact.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({ message: "Contact deleted successfully" });
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
