const User = require('../app/models/new.model')
const bcrypt = require('../node_modules/bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.register = async (req, res) =>{
    
    const existingUser = await User.findOne({ email: req.body.email })
    const existingMobile = await User.findOne({ mobile: req.body.mobile })

    if (existingUser) {
        return res.status(400).json({
            message: 'Email already exists.....', code: 400, data: {}
        });
    } 

    if (existingMobile) {
       // console.log('existingMobile',existingMobile);
        return res.status(400).json({
            message: 'Mobile number already exists......', code: 400, data: {}
        });
    }

    const user = new User({

        firstName : req.body.firstName,
        lastName: req.body.lastName,
        mobile : req.body.mobile,
        email : req.body.email,
        password : req.body.password


    });
   // console.log('firstName',firstName)
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error while creating new data...."
            });
        });
};

exports.login = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            message: 'Incorrect email or password.', code: 400, data: {}
        });
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    console.log('user.password',user.password)
    console.log('req.body.password',req.body.password)

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log('result of compare: ', validPassword);

    /* if(user.password === req.body.password){
        validPassword = true
    } */
    console.log('validPassword', validPassword);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    const token = await jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    return res.status(200).json({
        message: 'Success', code: 200, data: {
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile,
            email: user.email,
            token : token
        }
    });

};
// const User = require('../models/user.model');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()
// exports.register = async (req, res) => {
//     const existingUser = await User.findOne({ Email: req.body.Email })
//     const existingMobile = await User.findOne({ Mobile: req.body.Mobile })

//     if (existingUser) {
//         return res.status(400).json({
//             message: 'Already exists.', code: 400, data: {}

//         });
//     }

//     if (existingMobile) {
//         return res.status(400).json({
//             message: 'Already exists Mobile number.', code: 400, data: {}

//         });
//     }

//     const user = new User({
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName,
//         Mobile: req.body.Mobile,
//         Email: req.body.Email,
//         Password: req.body.Password,

//     });


//     // Save Note in the database
//     user.save()
//         .then(data => {
//             res.json({
//                 message: 'SuccessFully registered', code: 200, data: data
//             });
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Note."
//             });
//         });
// };