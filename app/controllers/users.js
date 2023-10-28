const has = require('has')
const bcrypt = require("bcrypt");
const moment = require('moment')
const db = require("../models");
const Users = db.users;
const Role = db.Role;
const Op = db.Sequelize.Op;
const encodePass = 24062475

exports.getList = async (req, res) => {
    try {
        let page = 1
        let limit = 15
        const search = req.query.search || null
        if (req.query.page) {
            page = parseInt(req.query.page, 10)
        }
        if (req.query.pageSize) {
            limit = parseInt(req.query.pageSize, 10)
        }
        let conditionSearch
        if (search) {
            conditionSearch = {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { username: { [Op.like]: `%${search}%` } }, 
                            { firstname: { [Op.like]: `%${search}%` } }, 
                            { lastname: { [Op.like]: `%${search}%` } }]
                    }
                ]
            }
        }
        const data = await Users.findAndCountAll({ 
            attributes : ["id", "username", "firstname", "lastname", "mobile", "roleId", "companycode", "employeecode"],
            include: [
                {
                    model: Role,
                    attributes: ['name'],
                    as: 'role',
                    required: false
                }
            ],
            where: {
                ...conditionSearch,
                deletedAt: null
            },
            offset:(page-1) * limit, 
            limit: limit,
            raw: true
        })
        return res.send({
            users: data.rows,
            count: data.count,
        });
    } catch (error) {
        return res.status(500).send({
            message:
            error.message || "Some error occurred while retrieving users."
        });
    } 
};

exports.create = async (req, res) => {
    const { username, password, firstname, lastname, roleId, mobile, companycode, employeecode } = req.body 
    if (!username || !password || !firstname || !lastname) {
        return res.status(400).send({
            message:  '"username", "password", "firstname", "lastname", "employeecode" and "companycode" are required.'
        });
    }
    try {
        const userExists = await Users.findOne({ where: { username: username } });
        if (userExists) {
            return res.status(400).send({
                message:  "This username has already been taken."
            });
        }
        const encPass = await bcrypt.hash(password, encodePass);
        await Users.create({
            username: username,
            password: encPass,
            firstname: firstname,
            lastname: lastname,
            roleId: roleId,
            mobile: mobile,
            companycode: companycode,
            employeecode: employeecode,
            createdBy: req.user.id,
            createdAt: moment().toDate(),
            updatedBy: req.user.id,
            updatedAt: moment().toDate(),
            employeecode: employeecode,
            companycode: companycode,
        })
        return res.send({
            message: "User created successfully.",
        });
    } catch (error) {
        return res.status(500).send({
            message:
            error.message || "Some error occurred while recording users."
        });
    }
    
};

exports.update = async (req, res) => {
    const userExists = await Users.findOne({ where: { id: req.params.id } });
    if (!userExists) {
        return res.status(400).send({
            message:  "User is not found."
        });
    }
    let objSave = {}
    if (has(req.body, 'username')) objSave.username = req.body.username
    if (has(req.body, 'password')) objSave.password = await bcrypt.hash(req.body.password, encodePass)
    if (has(req.body, 'firstname')) objSave.firstname = req.body.firstname
    if (has(req.body, 'lastname')) objSave.lastname = req.body.lastname
    if (has(req.body, 'roleId')) objSave.roleId = req.body.roleId
    if (has(req.body, 'mobile')) objSave.mobile = req.body.mobile
    if (has(req.body, 'companycode')) objSave.companycode = req.body.companycode
    if (has(req.body, 'employeecode')) objSave.employeecode = req.body.employeecode
    if(Object.keys(objSave).length === 0){
        return res.status(400).send({
            message:  "No data for update."
        });
    }
    objSave.updatedBy = req.user.id
    objSave.updatedAt = moment().toDate()
    try {
        await Users.update(objSave, { where: { id: req.params.id } })
        return res.status(200).end()
    } catch (error) {
        return res.status(500).send({
            message:  "Some error occurred while recording users."
        });
    }
    

};

exports.getDetail = async (req, res) => {
    try {
        let user = await Users.findOne({ 
            where: { id: req.params.id }, 
            attributes : ["id", "username", "password", "firstname", "lastname", "mobile", "roleId", "companycode", "employeecode"],
            raw: true 
        });
        if (!user) {
            return res.status(400).send({
                message:  "User not found."
            });
        }
        delete user.password
        return res.send(user);
    } catch (error) {
        return res.status(500).send({
            message:
            error.message || "Some error occurred while retrieving users."
        });
    }
    
};

exports.delete = async (req, res) => {
    const userExists = await Users.findOne({ where: { id: req.params.id } });
    if (!userExists) {
        return res.status(400).send({
            message:  "User is not found."
        });
    }
    let objDel = {}
    objDel.deletedBy = req.user.id
    objDel.deletedAt = moment().toDate()
    try {
        await Users.update(objDel, { where: { id: req.params.id } })
        return res.status(200).end()
    } catch (error) {
        return res.status(500).send({
            message:  "Some error occurred while recording users."
        });
    }
};

