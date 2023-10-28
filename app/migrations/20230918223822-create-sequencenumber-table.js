module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('sequencenumber', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            format: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            lastestno: {
                type: Sequelize.BIGINT,
                allowNull: false
            }
        })
        
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('sequencenumber')
    }
}
