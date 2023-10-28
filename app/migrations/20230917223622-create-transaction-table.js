module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('transaction', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            custid: {
                type: Sequelize.STRING,
                allowNull: false
            },
            saleareaid: {
                type: Sequelize.STRING,
            },
            custcode: {
                type: Sequelize.STRING,
                allowNull: false
            },
            custname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            custaddr1: {
                type: Sequelize.STRING,
            },
            district: {
                type: Sequelize.STRING,
            },
            amphur: {
                type: Sequelize.STRING,
            },
            province: {
                type: Sequelize.STRING,
            },
            creditdays: {
                type: Sequelize.BIGINT,
            },
            remaamnt: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            comp: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            latitude: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            longitude: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            cashamount: {
                type: Sequelize.FLOAT,
            },
            transferamont: {
                type: Sequelize.FLOAT,
            },
            checkamont: {
                type: Sequelize.FLOAT,
            },
            creditcardamont: {
                type: Sequelize.FLOAT,
            },
            paymentno: {
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
        return queryInterface.dropTable('transaction')
    }
}
