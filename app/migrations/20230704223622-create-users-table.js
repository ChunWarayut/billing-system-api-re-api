module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            firstname: {
                type: Sequelize.STRING
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            role_id: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            mobile: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            created_by: {
                type: Sequelize.STRING(24),
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
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            },
        })
        
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('users')
    }
}
