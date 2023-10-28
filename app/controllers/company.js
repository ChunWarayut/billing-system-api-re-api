const { QueryTypes } = require('sequelize');
const db = require("../models");

exports.getList = async (req, res) => {
    try {
        const query = `
            SELECT
                Comp,
                Comp_name
            FROM Comp
        `
        const results = await db.sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return res.send(results.map(item => ({
            code: item.Comp,
            name: item.Comp_name
        })));
    } catch (error) {
        return res.status(500).send({
            message:
                error.message || "Some error occurred while company."
        });
    }
};
