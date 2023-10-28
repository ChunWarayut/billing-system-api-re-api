module.exports = {
	up: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.addColumn('transaction', 'checkamount_BankBookID', { type: Sequelize.BIGINT, allowNull: true }),
		])
	},
	down: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.removeColumn('transaction', 'checkamount_BankBookID', { type: Sequelize.BIGINT, allowNull: true }),
		])
	}
}