module.exports = {
	up: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.changeColumn('users', 'firstname', { type: Sequelize.STRING(24), allowNull: false }),
			queryInterface.addColumn('users', 'employeecode', { type: Sequelize.STRING }),
			queryInterface.addColumn('users', 'companycode', { type: Sequelize.STRING }),
		])
	},
	down: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.changeColumn('users', 'createdBy', { type: Sequelize.STRING }),
			queryInterface.removeColumn('users', 'employeecode'),
			queryInterface.removeColumn('users', 'companycode'),
		])
	}
}
