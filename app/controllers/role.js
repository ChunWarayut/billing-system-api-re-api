const has = require('has')
const bcrypt = require("bcrypt");
const moment = require('moment')
const db = require("../models");
const Role = db.Role;
const RolePermission = db.RolePermission;
const Permission = db.Permission;
const sequelize = db.sequelize
const Op = db.Sequelize.Op;

exports.getList = async (req, res) => {
    try {
        const search = req.query.search || null
        let conditionSearch
        if (search) {
            conditionSearch = {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { name: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ]
            }
        }
        let includePermission 
        if (req.query.includepermission == "true") {
            includePermission = {
                include: {
                    model: Permission,
                    as: "permissions",
                    attributes : ["id", "code", "name"],
                    through: { attributes: [] }
                }
            }
        }
        const data = await Role.findAll({ 
            attributes : ["id", "code", "name"],
            ...includePermission,
            where: {
                ...conditionSearch,
                deletedAt: null
            },
        })
        return res.send(data);
    } catch (error) {
        return res.status(500).send({
            message:
            error.message || "Some error occurred while retrieving roles."
        });
    } 
};

exports.getDetail = async (req, res) => {
    try {
        let role = await Role.findOne({ 
            where: { id: req.params.id }, 
            attributes : ["id", "code", "name"],
            raw: true 
        });
        if (!role) {
            return res.status(400).send({
                message:  "role not found."
            });
        }
        let rolePermission = await RolePermission.findAll({ 
            where: { roleId: role.id }, 
            attributes : ["roleId", "permissionId"],
            include: [
                {
                    model: Permission,
                    attributes: ['code', 'name'],
                    as: 'permission',
                    required: false
                }
            ],
            raw: true 
        });
        let perm = rolePermission.map(rolePerm => {
            return {
                id: rolePerm.permissionId,
                code: rolePerm['permission.code'],
                name: rolePerm['permission.name']
            }
        })
        return res.send({ ...role, permissions:  perm});
    } catch (error) {
        return res.status(500).send({
            message:
            error.message || "Some error occurred while retrieving role."
        });
    }
};

exports.create = async (req, res) => {
    const { code, name, permissions } = req.body
    if (!code || !name ) {
        return res.status(400).send({
            message:  '"code", "name" are required.'
        });
    }
    try {
        const roleExists = await Role.findOne({ 
            where: { code: code },
            raw: true 
        });
        if (roleExists) {
            return res.status(400).send({
                message:  "This role has already been taken."
            });
        }
        await sequelize.transaction(async (t) => {
            const { id } = await Role.create(
                {
                    code: code,
                    name: name,
                    createdBy: req.user.id,
                    updatedBy: req.user.id,
                },
                { transaction: t }
            )
            if(permissions && permissions.length > 0 ){
                await Promise.all(permissions.map(async perm => {
                    await RolePermission.create(
                        {
                            roleId: id,
                            permissionId: perm,
                            createdBy: req.user.id,
                            updatedBy: req.user.id,
                        },
                        { transaction: t }
                    )
                }))
            }
			return 
		})
        return res.send({
            message: "Role created successfully.",
        });
    } catch (error) {
        return res.status(500).send({
            message:
            error.message || "Some error occurred while recording role."
        });
    }  
};

exports.update = async (req, res) => {
    const roleId = req.params.id
    const roleExists = await Role.findOne({ where: { id: roleId } });
    if (!roleExists) {
        return res.status(400).send({
            message:  "Role is not found."
        });
    }
    let roleObjSave = {}
    if (has(req.body, 'code')) roleObjSave.code = req.body.code
    if (has(req.body, 'name')) roleObjSave.name = req.body.name

    if(Object.keys(roleObjSave).length === 0){
        return res.status(400).send({
            message:  "No data for update."
        });
    }
    roleObjSave.updatedBy = req.user.id
    let arrSave = []
    const permissions = req.body.permissions
    try {
        if(permissions && permissions.length > 0){
            arrSave = await RolePermission.findAll({
                attributes: ['id', 'roleId', 'permissionId'],
                where: { roleId, permissionId: permissions },
                raw: true
            }).then((data) =>
                permissions.map((permissionId) => {
                    const isExisted = data.find((o) => o.roleId === Number(roleId) && o.permissionId === permissionId)
                    const objSave = {
                        roleId,
                        permissionId,
                        createdBy: req.user.id,
                        updatedBy: req.user.id
                    }
                    if (isExisted) {
                        objSave.id = isExisted.id
                    }
                    return objSave
                })
            )
        }
        await sequelize.transaction(async (t) => {
            await Role.update(roleObjSave, { where: { id: roleId } })
			for (const objSave of arrSave) {
				if (objSave.id) {
					delete objSave.createdBy
					await RolePermission.update(objSave, { where: { id: objSave.id }, transaction: t })
				} else {
					await RolePermission.create(objSave, { transaction: t })
				}
			}
			await RolePermission.destroy({
				where: { roleId, permissionId: { [Op.notIn]: permissions } },
				transaction: t
			})
		})
        return res.send({
            message: "Role updated successfully.",
        })
        
    } catch (error) {
        return res.status(500).send({
            message:  "Some error occurred while recording role."
        });
    }

};

exports.delete = async (req, res) => {
    const roleExists = await Role.findOne({ where: { id: req.params.id } });
    if (!roleExists) {
        return res.status(400).send({
            message:  "Role is not found."
        });
    }
    let objDel = {}
    objDel.deletedBy = req.user.id
    objDel.deletedAt = moment().toDate()
    try {
        await Role.update(objDel, { where: { id: req.params.id } })
        return res.status(200).end()
    } catch (error) {
        return res.status(500).send({
            message:  "Some error occurred while recording role."
        });
    }
};

