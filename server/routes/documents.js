const express = require('express'); 
const router = express.Router();
const {responseError} = require("./utils")
const Document = require('../models/document'); 

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
    const document = new Document({
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
            responseError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(document => {
            document.name = req.body.name;
            document.description = req.body.description;
            document.url = req.body.url;
            Document.updateOne({ id: req.params.id }, document)
                .then(result => {
                    res.status(204).json({
                        message: 'Document updated successfully'
                    })
                })
                .catch(error => {
                    responseError(res, error);
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Document not found.',
                error: { document: 'Document not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
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
