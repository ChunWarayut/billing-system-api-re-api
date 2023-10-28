const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const db = require("../models");
const Users = db.users;
const Permission = db.Permission;
const RolePermission = db.RolePermission;
const Role = db.Role;
const Op = db.Sequelize.Op;
const privateKey = process.env.JWT_PRIVATE_KEY || 'demo'


exports.login = async (req, res) => {
    const { username, password } = req.body;

    console.log(req.body);

    if (!username || !password ) {
        return res.status(400).send({
            message:  '"username", "password" are required.'
        });
    }
    let user = await Users.findOne({ 
        where: { username: username }, 
        attributes : ["id", "username", "password", "firstname", "lastname", "mobile", "roleId", "companycode", "employeecode"],
        include: [
            {
                model: Role,
                attributes: ['id', 'code'],
                as: 'role',
                required: false
            }
        ],
        raw: true 
    });
    if (!user) {
        return res.status(400).send({
            message:  "User not found."
        });
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({
            message:  "Invalid password."
        });
    }
    let permissions = []
    let userRolePermission = []
    if(user.roleId){
        user = { ...user, role: user['role.code']}
        userRolePermission = await RolePermission.findAll({
            where: { roleId:  user.roleId }, 
            attributes: ['roleId', 'permissionId'],
            include: [
                {
                    model: Permission,
                    attributes: ['id', 'code'],
                    as: 'permission',
                    required: false
                }
            ],
            raw: true
        })
        
    }
    userRolePermission.forEach(rp => {
        permissions.push(rp['permission.code'])
    })
    user = { ...user, permissions: permissions }
    delete user.password
    delete user['role.id']
    delete user['role.code']
    let copyUser = JSON.parse(JSON.stringify(user));
    const token = jwt.sign(copyUser, privateKey, { expiresIn: '24h' });
    return res.send({ token });
};

