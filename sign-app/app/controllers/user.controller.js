const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.register = async (req, res) => {
    const existingUser = await User.findOne({ Email: req.body.Email })
    const existingMobile = await User.findOne({ Mobile: req.body.Mobile })

    if (existingUser) {
        return res.status(400).json({
            message: 'Already exists.', code: 400, data: {}

        });
    }

    if (existingMobile) {
        return res.status(400).json({
            message: 'Already exists Mobile number.', code: 400, data: {}

        });
    }

    const user = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Mobile: req.body.Mobile,
        Email: req.body.Email,
        Password: req.body.Password,

    });


    // Save Note in the database
    user.save()
        .then(data => {
            res.json({
                message: 'SuccessFully registered', code: 200, data: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};


exports.login = async (req, res) => {
    let user = await User.findOne({ Email: req.body.Email });
    if (!user) {
        return res.status(400).json({
            message: 'Incorrect email or password.', code: 400, data: {}
        });
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.Password, user.Password);
    console.log('validPassword', validPassword);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    const token = await jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    return res.status(200).json({
        message: 'Success', code: 200, data: {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Mobile: user.Mobile,
            Email: user.Email,
            token : token
        }
    });

};