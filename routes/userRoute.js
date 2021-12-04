const express = require('express');
const router = express.Router();
const {v4: uuidv4 } = require('uuid');
const User = require('../models/User');

router.post('/', async (req, res)=>{
    try{
        const user = {
            _id: uuidv4(),
            username: req.body.username
        }
        await User.create(user);
        res.send(user);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});
router.get('/', async (req, res)=>{
    try{
        const users = await User.find();
        res.send(users);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;