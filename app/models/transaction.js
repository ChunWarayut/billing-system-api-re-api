module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define(
        "Transaction", 
        {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            custid: {
                type: Sequelize.STRING,
                allowNull: false
            },
            saleareaid: {
                type: Sequelize.STRING,
            },
            custcode: {
                type: Sequelize.STRING,
                allowNull: false
            },
            custname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            custaddr1: {
                type: Sequelize.STRING,
            },
            district: {
                type: Sequelize.STRING,
            },
            amphur: {
                type: Sequelize.STRING,
            },
            province: {
                type: Sequelize.STRING,
            },
            creditdays: {
                type: Sequelize.BIGINT,
            },
            remaamnt: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            comp: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            latitude: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            longitude: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            cashamount: {
                type: Sequelize.FLOAT,
            },
            transferamont: {
                type: Sequelize.FLOAT,
            },
            checkamont: {
                type: Sequelize.FLOAT,
            },
            creditcardamont: {
                type: Sequelize.FLOAT,
            },
            paymentno: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            createdBy: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            updatedBy: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            deletedBy: {
                type: Sequelize.STRING(24),
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            cashamountbankbookid: {
                field: 'cashamount_BankBookID',
                type: Sequelize.BIGINT,
                allowNull: true
            },
            transferamontbankbookid: {
                field: 'transferamont_BankBookID',
                type: Sequelize.BIGINT,
                allowNull: true
            },
            checkdate: {
                type: Sequelize.STRING,
            },
            checkno: {
                type: Sequelize.STRING,
            },
            checkamountbankbookid: {
                field: 'checkamount_BankBookID',
                type: Sequelize.BIGINT,
                allowNull: true
            },
        },
        {
			sequelize,
			modelName: 'Transaction',
			tableName: 'transaction',
			paranoid: true
		})
    return Transaction;
};