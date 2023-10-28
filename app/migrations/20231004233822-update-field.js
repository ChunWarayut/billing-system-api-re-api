module.exports = {
	up: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.changeColumn('transaction', 'latitude', { type: Sequelize.FLOAT, allowNull: true }),
			queryInterface.changeColumn('transaction', 'longitude', { type: Sequelize.FLOAT, allowNull: true }),
		])
	},
	down: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.changeColumn('transaction', 'latitude', { type: Sequelize.FLOAT, allowNull: false }),
			queryInterface.changeColumn('transaction', 'longitude', { type: Sequelize.FLOAT, allowNull: false }),
		])
	}
}