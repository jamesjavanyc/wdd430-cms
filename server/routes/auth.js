const router = require("express").Router();
const User = require("../models/users")
const bcrypt = require("bcrypt")

router.post("/register",async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        // 加密加盐
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        // 等价const newUser = new User(req.body);
        const newUser = new User({
            email:req.body.email,
            password:hashedPass
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.post("/login", async (req,res)=>{
    try{
        const user = await  User.findOne({email: req.body.email});
        if (!user) {
            res.status(400).json("No such user.");
            return;
        } 
        const validate = await bcrypt.compare(req.body.password,user.password);
        if (!validate) {
            res.status(400).json("Wrong password.");
            return;
        }
        const {password, _id, ...others} = user._doc;
        others.token = _id;
        res.status(200).json(others);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports = router;