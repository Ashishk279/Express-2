const { Router } = require('express');
const User = require('../schemas/User')
const passport = require('passport')
const { hashPassword, comparePassword } = require('../utils/helpers')
const router = Router();

// router.post('/login', (req, res) => {
//     const { username , password} = req.body;
//     if(username && password){
//         if(req.session.user){
//             res.send(req.session.user)
//         }else{
//             req.session.user ={
//                 username,
//             }
//         };
//         res.send(req.session)
//     }else res.send(401);
// })

// router.post('/login', async (req, res) => {
//     const { email , password} = req.body;
//     if(!email || !password){
//         return res.send(400);
//     }
//     const userDB = await User.findOne({email});
//     if(!userDB){
//         return res.send(401)
//     }
//     const isValid = comparePassword(password, userDB.password);
//     if(isValid){
//         console.log("Authenticated Successfully");
//         req.session.user = userDB;
//         return res.send(200);
//     }else{
//         console.log("Failed to Authenticate");
//         return res.send(401);
//     }
// })

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("Logged In")
    res.send(201)
})



router.post('/register', async (req, res) => {
    const { email } = req.body;
    const userDB = await User.findOne({ $or: [{ email }] });
    if (userDB) {
        res.status(400).send({ msg: "User already exist" });
    } else {
        const password = hashPassword(req.body.password);
        console.log(password)
        const newUser = await User.create({ email, password });
        console.log(newUser)
        res.send(201);
    }
})

router.get('/discord', passport.authenticate('discord'), (req, res) => {
    res.send(200)
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.send(200)
});

module.exports = router;