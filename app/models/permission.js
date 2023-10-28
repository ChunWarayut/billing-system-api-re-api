module.exports = (sequelize, DataTypes) => {
	const Permission = sequelize.define(
		'Permission',
		{
			id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
			code: {
				field: 'code',
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			name: {
				field: 'name',
				type: DataTypes.STRING,
				allowNull: false
			},
			createdBy: {
				field: 'created_by',
				type: DataTypes.STRING(24)
			},
			updatedBy: {
				field: 'updated_by',
				type: DataTypes.STRING(24),
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'Permission',
			tableName: 'permission'
		}
	)

	Permission.associate = (models) => {
		Permission.hasMany(models.RolePermission, {
			as: 'mapRoles',
			foreignKey: 'permissionId'
		})
		Permission.belongsToMany(models.Role, {
			as: 'roles',
			through: models.RolePermission,
			foreignKey: 'permissionId'
		})
	}

	return Permission
}
