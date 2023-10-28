module.exports = {
	up: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.addColumn('transaction', 'cashamount_BankBookID', { type: Sequelize.BIGINT, allowNull: true }),
			queryInterface.addColumn('transaction', 'transferamont_BankBookID', { type: Sequelize.BIGINT, allowNull: true }),
		])
	},
	down: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.removeColumn('transaction', 'cashamount_BankBookID', { type: Sequelize.BIGINT, allowNull: true }),
			queryInterface.removeColumn('transaction', 'transferamont_BankBookID', { type: Sequelize.BIGINT, allowNull: true }),
		])
	}
}