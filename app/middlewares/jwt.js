const httpContext = require('express-http-context')
const jwt = require('jsonwebtoken')
const privateKey = process.env.JWT_PRIVATE_KEY || 'demo'

exports.verifyToken = (req, res, next) => {
	try {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1]
			req.user = jwt.verify(token, privateKey)
			httpContext.set('reqUser', req.user)
			if (!req.user.id) {
				req.user.id = req.user.id
			}
			res.locals.user = req.user
			next()
		} else {
			return res.status(400).send({
				message: "Token not found."
			});
		}
	} catch (error) {
		return res.status(401).send({
            message:
            error.message || "Some error occurred while verifying users."
        });
	}
}
