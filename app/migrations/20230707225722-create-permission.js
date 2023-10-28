module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('permission', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			code: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			name: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('permission')
	}
}
