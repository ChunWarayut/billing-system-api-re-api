module.exports = (sequelize, DataTypes) => {
	const RolePermission = sequelize.define(
		'RolePermission',
		{
			id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
			roleId: {
				field: 'role_id',
				type: DataTypes.INTEGER,
				allowNull: false
			},
			permissionId: {
				field: 'permission_id',
				type: DataTypes.INTEGER,
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
			modelName: 'RolePermission',
			tableName: 'role_permission'
		}
	)

	RolePermission.associate = (models) => {
		RolePermission.belongsTo(models.Role, {
			as: 'role',
			foreignKey: 'roleId'
		})
		RolePermission.belongsTo(models.Permission, {
			as: 'permission',
			foreignKey: 'permissionId'
		})
	}

	return RolePermission
}
