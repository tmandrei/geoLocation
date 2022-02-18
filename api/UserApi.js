const { Router } = require("express");
const router = Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User')

router.post("/user/register", async (req, res) => {
    try {
        var data = req.body
        console.log(data)
        var users = await User.find({username: data.username})
        if (users.length == 0) {
            console.log('------------\n[UserApi.js]POST /user/register\n------------\n', data, '\n------------')
            data.password = bcrypt.hashSync(data.password, 10)
            var user = new User(data)
            await user.save({email: data.email},function (err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Registered user\n", docs)
                    return res.status(200).json(docs);
                }
            })
        } else {
            res.status(200).json({})
            console.log('Found users');
        }
        
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
