module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('transactioninvoice', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            transaction_id: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            used: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            qty_buy: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            cust_id: {
                type: Sequelize.STRING,
                allowNull: false
            },
            custcode: {
                type: Sequelize.STRING,
                allowNull: false
            },
            docu_no: {
                type: Sequelize.STRING,
                allowNull: false
            },
            inv_no: {
                type: Sequelize.STRING,
                allowNull: false
            },
            comp: {
                type: Sequelize.STRING,
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
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
        
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('transactioninvoice')
    }
}
