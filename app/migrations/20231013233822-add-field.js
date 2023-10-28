module.exports = {
	up: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.addColumn('transaction', 'checkdate', { type: Sequelize.STRING, allowNull: true }),
			queryInterface.addColumn('transaction', 'checkno', { type: Sequelize.STRING, allowNull: true }),
		])
	},
	down: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.removeColumn('transaction', 'checkdate', { type: Sequelize.STRING, allowNull: true }),
			queryInterface.removeColumn('transaction', 'checkno', { type: Sequelize.STRING, allowNull: true }),
		])
	}
}