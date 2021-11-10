const { check, validationResult} = require("express-validator");

const validationRules = (req,res) => {
  return  [
        check("FirstName", "Please Enter a Valid name")
        .not()
        .isEmpty().matches(/^[A-Za-z\s]+$/),
        check("LastName", "Please Enter a Valid last name")
        .not()
        .isEmpty().matches(/^[A-Za-z\s]+$/),
        check("Mobile", "Please enter a valid mobile number").isLength({
            min: 10
        }).isNumeric(),
        check("Email", "Please enter a valid email").isEmail(),
        check("Password", "Please enter a valid password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/),
        check("ConfirmPassword", "paswword not match").matches()
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