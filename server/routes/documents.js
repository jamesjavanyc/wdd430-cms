const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
function responseError(res, error) {
    res.status(500).json({
        message: 'An error occurred',
        error: error
    });
}
const Document = require('../models/document');
const sequenceGenerator = require('./sequenceGenerator');

router.get('/', (req, res, next) => {
    Document.find()
        .then(documents => {
            res.status(200).json({
                message: 'Documents fetched successfully',
                data: documents
            });
        })
        .catch(error => {
            responseError(res, error);
        });
}
);

router.post('/', (req, res, next) => {
    const maxContactId = uuidv4();
    const document = new Document({
        id: maxContactId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });
    document.save()
        .then(createdDocument => {
            res.status(201).json({
                message: 'Document added successfully',
                data: createdDocument
            });
        })
        .catch(error => {
            console.log(error)
            responseError(res, error);
        });
});

router.put('/:id', async(req, res, next) => {
    try {
        let document = {
                id :req.params.id,
                name : req.body.name,
                description : req.body.description,
                url : req.body.url
            }
        Document.updateOne({ id: req.params.id }, document)
            .then(result => {
                res.status(204).json({
                    message: 'Document updated successfully'
                })
            })
            .catch(error => {
                console.log(error)
                responseError(res, error);
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Document not found.',
            error: { document: 'Document not found' }
        });
    };
});

router.delete("/:id", async (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(document => {
            Document.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({ message: "Document deleted successfully" });
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
