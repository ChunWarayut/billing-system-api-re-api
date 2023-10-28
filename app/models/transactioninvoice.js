module.exports = (sequelize, DataTypes) => {
	const TransactionInvoice = sequelize.define(
		'TransactionInvoice',
		{
			id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            transactionId: {
                field: 'transaction_id',
                type: DataTypes.BIGINT,
                allowNull: false
            },
            used: {
                field: 'used',
                type: DataTypes.FLOAT,
                allowNull: false
            },
            qtyBuy: {
                field: 'qty_buy',
                type: DataTypes.FLOAT,
                allowNull: false
            },
            custId: {
                field: 'cust_id',
                type: DataTypes.STRING,
                allowNull: false
            },
            custcode: {
                field: 'custcode',
                type: DataTypes.STRING,
                allowNull: false
            },
            docuNo: {
                field: 'docu_no',
                type: DataTypes.STRING,
                allowNull: false
            },
            invNo: {
                field: 'inv_no',
                type: DataTypes.STRING,
                allowNull: false
            },
            comp: {
                field: 'comp',
                type: DataTypes.STRING,
                allowNull: false
            },
            createdBy: {
				field: 'created_by',
				type: DataTypes.STRING(24)
			},
			updatedBy: {
				field: 'updated_by',
				type: DataTypes.STRING(24),
				allowNull: false
			},
			createdAt: {
                field: 'created_at',
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                field: 'updated_at',
                allowNull: false,
                type: DataTypes.DATE
            },
		},
		{
			sequelize,
			modelName: 'TransactionInvoice',
			tableName: 'transactioninvoice'
		}
	)
	return TransactionInvoice
}