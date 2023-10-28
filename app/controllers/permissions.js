const db = require("../models");
const Permission = db.Permission;

exports.getList = async (req, res) => {
    try { 
        const data = await Permission.findAll({ 
            attributes : ["id", "code", "name"],
        })
        return res.send(data);
    } catch (error) {
        return res.status(500).send({
            message:
            error.message || "Some error occurred while retrieving permissions."
        });
    } 
};