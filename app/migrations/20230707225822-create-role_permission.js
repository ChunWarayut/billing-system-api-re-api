module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('role_permission', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			role_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			permission_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			created_by: {
				type: Sequelize.STRING(24)
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_by: {
				type: Sequelize.STRING(24),
				allowNull: false
			}
		})
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('role_permission')
	}
}
