const { QueryTypes } = require('sequelize');
const moment = require('moment')
const { formidable, IncomingForm } = require('formidable');
const fs = require('fs');
const { Blob } = require("buffer");
const db = require("../models");
const Attachment = db.Attachment;
const Transactions = db.Transaction;
const TransactionInvoice = db.TransactionInvoice;
const SequenceNumber = db.SequenceNumber;
const sequelize = db.sequelize

function groupData(prData) {
    if (!prData || (prData && prData.length == 0)) return []
    let helper = {};
    let result = prData.reduce(function (r, o) {
        let key = o.CustID + '-' + o.CompCode;
        if (!helper[key]) {
            helper[key] = Object.assign({}, o); // create a copy of o
            r.push(helper[key]);
        } else {
            helper[key].used += o.used;
            helper[key].instances += o.instances;
        }
        return r;
    }, []);
    return result
}

async function getPaymentNo(type) {
    const seq = await SequenceNumber.findOne({
        where: { format: type },
        raw: true
    });
    if (seq) {
        let newlastestno = Number(seq.lastestno) + 1
        await SequenceNumber.update(
            {
                lastestno: newlastestno
            },
            {
                where: { id: seq.id }
            }
        )
        return moment().format(seq.format) + String(newlastestno).padStart(4, '0')
    }
}



exports.getList = async (req, res) => {
    try {
        const empCode = req.user.employeecode || ''
        const comp = req.user.companycode || ''
        const cusname = req.query.q || ''
        const query = `
        declare @empcode nvarchar(100)='${empCode}' ;
        declare @comp nvarchar(100)='${comp}' ;
        declare @cusname nvarchar(100)='%${cusname}%' ;
        declare @countCode int  =  (SELECT count( CustCode) FROM EMCust_EMPCode where  EmpCode =@empcode and  comp= @comp ) ; 
        if  @countCode != 0
        begin
        SELECT CustID, SaleAreaID, CustCode, CustName, CreditDays, CustAddr1, District, Amphur, Province, remaamnt, (SELECT Comp_name as Comp FROM Comp WHERE Comp.Comp = EMCust_SOInv.Comp) Comp,
        (SELECT Comp FROM Comp WHERE Comp.Comp = EMCust_SOInv.Comp) CompCode
        FROM EMCust_SOInv
        WHERE  (CustCode IN (SELECT CustCode  FROM EMCust_EMPCode where  EmpCode =@empcode and  comp= @comp) and  comp= @comp)
        AND (CustName LIKE @cusname OR CustCode LIKE @cusname)
        Order by  CustCode,CustName
        end
        else
        begin
            SELECT   *
            FROM   EMCust_SOInv
            WHERE     comp= @comp AND (CustName LIKE @cusname OR CustCode LIKE @cusname)
            Order by  CustCode,CustName
        end
    `

        console.log('paymentreceive list query: \n', query + '\n');

        const results = await db.sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        let newResults = groupData(results)
        return res.send(newResults);
    } catch (error) {
        return res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving customers."
        });
    }
};

exports.executeInvoice = async (req, res) => {
    const { custCode, compcode, amount } = req.body
    if (!custCode || !compcode || !amount) {
        return res.status(400).send({
            message: '"custCode", "compcode", "amount" are required.'
        });
    }
    try {
        const query = `EXECUTE [dbo].[FiFo_Invoice] '${custCode}' ,'${compcode}' ,${amount}`
        console.log('paymentreceive execute invoice: \n', query + '\n');
        const result = await db.sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return res.send(result);
    } catch (error) {
        throw new error
    }
}

exports.create = async (req, res) => {
    try {
        const form = new IncomingForm({ multiples: true });
        const formData = new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    reject("error");
                }
                resolve({ fields, files });
            });
        });

        const { fields, files } = await formData;
        if (!fields.paymentDetails || (fields && fields.paymentDetails && fields.paymentDetails.length == 0)) {
            return res.status(500).send({
                message: "Please enter payment details."
            });
        }
        let paymentDetails = JSON.parse(fields.paymentDetails || [])
        if (!paymentDetails || (paymentDetails && fields.length == 0)) {
            return res.status(500).send({
                message: "Please enter payment details."
            });
        }
        const paymentno = await getPaymentNo('YYMMDD')
        let cashFiles = Object.values(files.cashFiles || [])
        for (const file of cashFiles) {
            const buffer = fs.readFileSync(file.filepath);
            const base64data = buffer.toString("base64")
            if (base64data) {
                await Attachment.create(
                    {
                        base64data: `data:${file.mimetype};base64,${base64data}`,
                        createdBy: req.user.id,
                        createdAt: moment().toDate(),
                        paymenttype: "P002",
                        paymentno: paymentno,
                        updatedBy: req.user.id,
                        updatedAt: moment().toDate(),
                        deletedBy: null,
                        deletedAt: null
                    },
                )
            }
        }

        let checkFiles = Object.values(files.checkFiles || [])
        for (const file of checkFiles) {
            const buffer = fs.readFileSync(file.filepath);
            const base64data = buffer.toString("base64")
            if (base64data) {
                await Attachment.create(
                    {
                        base64data: `data:${file.mimetype};base64,${base64data}`,
                        createdBy: req.user.id,
                        createdAt: moment().toDate(),
                        paymenttype: "P003",
                        paymentno: paymentno,
                        updatedBy: req.user.id,
                        updatedAt: moment().toDate(),
                        deletedBy: null,
                        deletedAt: null
                    },
                )
            }
        }

        let transferFiles = Object.values(files.transferFiles || [])
        for (const file of transferFiles) {
            const buffer = fs.readFileSync(file.filepath);
            const base64data = buffer.toString("base64")
            if (base64data) {
                await Attachment.create(
                    {
                        base64data: `data:${file.mimetype};base64,${base64data}`,
                        createdBy: req.user.id,
                        createdAt: moment().toDate(),
                        paymenttype: "P001",
                        paymentno: paymentno,
                        updatedBy: req.user.id,
                        updatedAt: moment().toDate(),
                        deletedBy: null,
                        deletedAt: null
                    },
                )
            }
        }

        let creditCardFiles = Object.values(files.creditCardFiles || [])
        for (const file of creditCardFiles) {
            const buffer = fs.readFileSync(file.filepath);
            const base64data = buffer.toString("base64")
            if (base64data) {
                await Attachment.create(
                    {
                        base64data: `data:${file.mimetype};base64,${base64data}`,
                        createdBy: req.user.id,
                        createdAt: moment().toDate(),
                        paymenttype: "P004",
                        paymentno: paymentno,
                        updatedBy: req.user.id,
                        updatedAt: moment().toDate(),
                        deletedBy: null,
                        deletedAt: null
                    },
                )
            }
        }
        let resp = []
        for (const payment of paymentDetails) {
            const dataTransaction = {
                custid: payment.custID,
                saleareaid: payment.saleAreaID,
                custcode: payment.custCode,
                custname: payment.custName,
                creditdays: payment.creditDays || 0,
                custaddr1: payment.custAddr1,
                district: payment.district,
                amphur: payment.amphur,
                province: payment.province,
                remaamnt: parseFloat(payment.remaamnt.toFixed(2)) || 0,
                comp: payment.comp || null,
                latitude: payment.latitude || null,
                longitude: payment.longitude,
                createdBy: req.user.id,
                createdAt: moment().toDate(),
                updatedBy: req.user.id,
                updatedAt: moment().toDate(),
                cashamount: parseFloat(payment.cashamount.toFixed(2)) || 0,
                transferamont: parseFloat(payment.transferamont.toFixed(2)) || 0,
                checkamont: parseFloat(payment.checkamont.toFixed(2)) || 0,
                creditcardamont: parseFloat(payment.creditcardamont.toFixed(2)) || 0,
                cashamountbankbookid: payment.cashamountbankbookid || null,
                transferamontbankbookid: payment.transferamontbankbookid || null,
                checkamountbankbookid: payment.checkamountbankbookid || null,
                checkdate: payment.checkdate,
                checkno: payment.checkno,
                paymentno
            }
            const { id } = await Transactions.create(dataTransaction)
            const executedPaymentReceive = payment.excutedInvoice
            for (const excuted of executedPaymentReceive) {
                const dataTransactionInvoice = {
                    custId: excuted.CustID && excuted.CustID.toString(),
                    custcode: excuted.custcode,
                    used: excuted.used,
                    qtyBuy: excuted.Qty_Buy,
                    comp: excuted.comp,
                    transactionId: Number(id),
                    docuNo: excuted.DocuNo,
                    invNo: excuted.InvNo,
                    createdBy: req.user.id && Number(req.user.id),
                    createdAt: moment().toDate(),
                    updatedBy: req.user.id && Number(req.user.id),
                    updatedAt: moment().toDate()
                }
                await TransactionInvoice.create(dataTransactionInvoice)
            }
        }
        return res.send();
    } catch (error) {
        console.log("error----->", error)
        return res.status(500).send({
            message:
                error.message || "Some error occurred while recording transaction."
        });
    }

};