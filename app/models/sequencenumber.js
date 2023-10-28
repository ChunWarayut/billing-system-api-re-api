module.exports = (sequelize, DataTypes) => {
	const SequenceNumber = sequelize.define(
		'SequenceNumber',
		{
			id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            format: {
                type: DataTypes.STRING(24),
                allowNull: false
            },
            lastestno: {
                type: DataTypes.BIGINT,
                allowNull: false
            }
		},
		{
			sequelize,
			modelName: 'SequenceNumber',
			tableName: 'sequencenumber'
		}
	)
	return SequenceNumber
}
