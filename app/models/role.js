module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define(
		'Role',
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
			},
			deletedBy: {
				field: 'deleted_by',
                type: DataTypes.STRING(24),
                allowNull: true
            },
			deletedAt: {
				field: 'deleted_at',
                allowNull: true,
                type: DataTypes.DATE
            },
		},
		{
			sequelize,
			modelName: 'Role',
			tableName: 'role'
		}
	)

	Role.associate = (models) => {
		Role.hasMany(models.RolePermission, {
			as: 'mapPermission',
			sourceKey: 'id',
			foreignKey: 'roleId'
		})
		Role.belongsToMany(models.Permission, {
			as: 'permissions',
			through: models.RolePermission,
			foreignKey: 'roleId'
		})
		Role.hasOne(models.users, {
			sourceKey: 'id',
			as: 'role',
			foreignKey: 'roleId'
		})
	}


	return Role
}
