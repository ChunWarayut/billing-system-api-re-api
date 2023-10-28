module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('attachments', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            base64data: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            paymentno: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            paymenttype: {
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
        return queryInterface.dropTable('attachments')
    }
}
