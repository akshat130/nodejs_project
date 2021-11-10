const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        const token = req.headers['token']
        if (token) {
            const validate = await jwt.verify(token, process.env.JWT_SECRET)
            next()
        }
        else {
            res.send("plz provide the token")
        }
    } catch (e) {
        return res.send(e.message)
    }

}

module.exports = {
    auth
}