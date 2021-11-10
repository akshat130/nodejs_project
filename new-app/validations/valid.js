const { check, validationResult} = require("express-validator");

const validationRules = (req,res) => {
  return  [
        check("firstName", "Please Enter a Valid name")
        .not()
        .isEmpty().matches(/^[A-Za-z\s]+$/),
        check("lastName", "Please Enter a Valid last name")
        .not()
        .isEmpty().matches(/^[A-Za-z\s]+$/),
        check("mobile", "Please enter a valid mobile number").isLength({
            min: 10
        }).isNumeric(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/),
       
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            code : 400 ,
            data : {}
        });
    }

    return next();
}  

module.exports = { validationRules,validate }