module.exports = (sequelize, DataTypes) => {
	const Attachment = sequelize.define(
		'Attachment',
		{
			id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
			base64data: {
				field: 'base64data',
				type: DataTypes.TEXT,
				allowNull: false,
			},
            paymentno: {
                type: DataTypes.STRING(24),
                allowNull: false
            },
            paymenttype: {
                type: DataTypes.STRING(24),
                allowNull: false
            },
			createdBy: {
                type: DataTypes.STRING(24),
                allowNull: false
            },
            updatedBy: {
                type: DataTypes.STRING(24),
                allowNull: false
            },
            deletedBy: {
                type: DataTypes.STRING(24),
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            },
		},
		{
			sequelize,
			modelName: 'Attachment',
			tableName: 'attachments'
		}
	)
	return Attachment
}
