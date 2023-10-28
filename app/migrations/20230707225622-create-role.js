module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('role', {
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
			},
			deleted_by: {
                type: Sequelize.STRING(24),
                allowNull: true
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            },
		})
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('role')
	}
}
