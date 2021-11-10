const { check, validationResult} = require("express-validator");

const validationRules = (req,res) => {
  return  [
        check("title", "title is mandatory")
        .not()
        .isEmpty(),
        check("description", "description is mandatory ")
        .not()
        .isEmpty()
              
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