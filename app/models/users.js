module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define(
        "users", 
        {
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
            employeecode: {
                type: Sequelize.STRING,
                allowNull: false
            },
            companycode: {
                type: Sequelize.STRING,
                allowNull: false
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            roleId: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            mobile: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            employeecode: {
                type: Sequelize.STRING,
                allowNull: false
            },
            companycode: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdBy: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            updatedBy: {
                type: Sequelize.STRING(24),
                allowNull: false
            },
            deletedBy: {
                type: Sequelize.STRING(24),
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
        },
        {
			sequelize,
			modelName: 'User',
			tableName: 'users',
			paranoid: true
		})
        Users.associate = (models) => {
            Users.belongsTo(models.Role, {
                as: 'role',
                foreignKey: 'roleId'
            })
        }
    return Users;
};