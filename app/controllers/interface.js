const { QueryTypes } = require('sequelize');
const moment = require('moment')
const { formidable, IncomingForm } = require('formidable');
const fs = require('fs');
const { Blob } = require("buffer");
const db = require("../models");

exports.getCompanyList = async (req, res) => {
    try {
        const results = await db.sequelize.query(`SELECT * FROM Comp`, 
        {
            type: QueryTypes.SELECT
        });
        return res.send(results);
    } catch (error) {
        return res.status(500).send({
            message:
            error.message || "Some error occurred while retrieving companies."
        });
    } 
};


exports.getBankList = async (req, res) => {
    const comp = req.user.companycode || ''
    console.log()
    try {
        let query = `SELECT BankBookID, BankBrchCode, BankName, BankBrchName, BookNo
        FROM EMBank_Book
        WHERE BrchCode = '${comp}'
        ORDER BY BankCode, BookNo`
        const results = await db.sequelize.query(query, 
        {
            type: QueryTypes.SELECT
        });
        return res.send(results.map(item => ({
            index: item.BankBookID,
            name: `${item.BankName}-${item.BankBrchName}-(${item.BookNo})`
        })));
    } catch (error) {
        return res.status(500).send({
            message:
            error.message || "Some error occurred while retrieving banks."
        });
    } 
};
