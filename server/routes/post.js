const router = require("express").Router();
const User = require("../models/users");
const Post = require("../models/posts");

router.post("/", async (req, res) => {
    try {
        const newPost = await new Post(req.body);
        await newPost.save();
        const savedPost = await Post.findOne({ title: req.body.title });
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        await post.delete();
        res.status(200).json("Your post has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put("/:id", async (req, res) => {
    try {
        Post.findOne({ id: req.params.id })
        .then(post => {
            post.title = req.body.title
            post.body = req.body.body
            Post.updateOne({ _id: req.params.id }, post)
                .then(result => {
                    res.status(204).json({
                        message: 'Contact updated successfully'
                    })
                })
                .catch(error => {
                    responseError(res, error);
                });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});





router.get("/", async (req, res) => {
    try {
        let posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;