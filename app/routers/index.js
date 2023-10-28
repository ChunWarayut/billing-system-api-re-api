const express = require("express");
const router = express.Router()
const jwt = require("../middlewares/jwt")
const authenticate = require('../controllers/authenticate')
const users = require('../controllers/users')
const role = require('../controllers/role')
const permissions = require('../controllers/permissions')
const paymentreceive = require('../controllers/paymentreceive')
const company = require('../controllers/company')
const interface = require('../controllers/interface')

//authenticate
router.post('/login', authenticate.login)


//users
router.get('/users', [ jwt.verifyToken ], users.getList)
router.post('/users', [ jwt.verifyToken ], users.create)
router.put('/users/:id', [ jwt.verifyToken ], users.update)
router.get('/users/:id', [ jwt.verifyToken ], users.getDetail)
router.delete('/users/:id', [ jwt.verifyToken ], users.delete)

//role
router.get('/roles', [ jwt.verifyToken ], role.getList)
router.get('/roles/:id', [ jwt.verifyToken ], role.getDetail)
router.post('/roles', [ jwt.verifyToken ], role.create)
router.put('/roles/:id', [ jwt.verifyToken ], role.update)
router.delete('/roles/:id', [ jwt.verifyToken ], role.delete)

//permission
router.get('/permissions', [ jwt.verifyToken ], permissions.getList)

//paymentreceive
router.get('/paymentreceives', [ jwt.verifyToken ], paymentreceive.getList)
router.post('/paymentreceives', [ jwt.verifyToken ], paymentreceive.create)
router.post('/executeinvoice', [ jwt.verifyToken ], paymentreceive.executeInvoice)

//company
router.get('/company', [ jwt.verifyToken ], company.getList)
//interface
router.get('/companies', [ jwt.verifyToken ], interface.getCompanyList)
router.get('/banks', [ jwt.verifyToken ], interface.getBankList)
module.exports = router;

