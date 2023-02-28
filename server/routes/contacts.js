const express = require('express');
const { v4: uuidv4 } = require('uuid');
function responseError(res, error) {
    res.status(500).json({
        message: 'An error occurred',
        error: error
    });
}
const router = express.Router();
const Contact = require('../models/contact');
const sequenceGenerator = require('./sequenceGenerator');

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
    const maxContactId = uuidv4();
    const contact = new Contact({
        id: maxContactId,
        group: req.body.group,
        phone: req.body.phone,
        name: req.body.name,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
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
    try {
        let contact = {
            id : req.params.id,
            group :req.body.group,
            name : req.body.name,
            imageUrl : req.body.imageUrl,
            phone : req.body.phone,
            email: req.body.email
        }
        Contact.updateOne({ id: req.params.id }, contact)
            .then(result => {
                res.status(204).json({
                    message: 'Contact updated successfully'
                })
            })
    } catch (error) {
        res.status(500).json({
            message: 'Contact not found.',
            error: { contact: 'Contact not found' }
        });
    };
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
