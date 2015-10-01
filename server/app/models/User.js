'use strict';

module.exports = function (sequelize, DataTypes) {

	var User = sequelize.define('User', {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.CHAR(100),
			allowNull: false,
			validate: {
				max: {
					args: 100,
					msg: 'Max permitted is 100'
				}
			}
		},
		cpf: {
			type: DataTypes.BIGINT(11),
			allowNull: false,
			validate: {
				max: {
					args: 11,
					msg: 'Max permitted is 11'
				}
			}
		},
		active: {
			type: DataTypes.CHAR(1),
			defaultValue: 'Y',
			allowNull: false,
			validate: {
				is: {
					args: ['Y | N'],
					msg: 'Must be Y for active or N for not'
				}
			}
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		email: {
			type: DataTypes.CHAR(50),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: {
					msg: "Must be an email"
				},
				max: {
					args: 50,
					msg: 'Max permitted is 50'
				}
			}
		},
		type: {
			type: DataTypes.CHAR(1),
			defaultValue: 'U',
			allowNull: false,
			validate: {
				is: {
					args: ['U | A | M'],
					msg: 'Must be U for USER, A for ADMIN or M for MODERATOR'
				}
			}
		},
		password: {
			type: DataTypes.CHAR(60),
			allowNull: false,
			validate: {
				max: {
					args: 60,
					msg: 'Max permitted is 60'
				}
			}
		},
		gender: {
			type: DataTypes.CHAR(1),
			allowNull: false,
			validate: {
				is: {
					args: ['F | M'],
					msg: 'Must be M for MAN or F for FEMALE'
				}
			}
		},
		coverageRadius: {
			type: DataTypes.INTEGER,
			defaultValue: 10,
			allowNull: false,
			validate: {
				min: {
					args: 1,
					msg: 'Must be at least 1'
				}
			}
		}
	}, {
		timestamps: false,
		tableName: 'user',
		freezeTableName: true,
		underscored: false,
		classMethods: {
			associate: function (models) {
				User.hasMany(models.Abuse, {
					foreignKey: {
						name: 'userId',
						allowNull: false
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				});
				User.hasMany(models.Report, {
					foreignKey: {
						name: 'userId',
						allowNull: false
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				});
				User.belongsToMany(models.Report, {
					through: models.Up,
					foreignKey: 'userId'
				});
			}
		},
		getterMethods: {
			getId: function () {
				return this.getDataValue('id');
			},
			getName: function () {
				this.getDataValue('name');
			},
			getCpf: function () {
				this.getDataValue('cpf');
			},
			getActive: function () {
				return this.getDataValue('active');
			},
			getImage: function () {
				return this.getDataValue('image');
			},
			getEmail: function () {
				return this.getDataValue('email');
			},
			getType: function () {
				return this.getDataValue('type');
			},
			getPassword: function () {
				return this.getDataValue('password');
			},
			getGender: function () {
				return this.getDataValue('gender');
			},
			getCoverageRadius: function () {
				return this.getDataValue('coverageRadius');
			}
		},
		setterMethods: {
			setId: function (id) {
				this.setDataValue('id', id);
			},
			setName: function (name) {
				this.setDataValue('name', name);
			},
			setCpf: function (name) {
				this.setDataValue('cpf', cpf);
			},
			setActive: function (active) {
				this.setDataValue('active', active);
			},
			setImage: function (image) {
				this.setDataValue('image', image);
			},
			setEmail: function (email) {
				this.setDataValue('email', email);
			},
			setType: function (type) {
				this.setDataValue('type', type);
			},
			setPassword: function (password) {
				this.setDataValue('password', password);
			},
			setGender: function (gender) {
				this.setDataValue('gender', gender);
			},
			setCoverageRadius: function (coverageRadius) {
				this.setDataValue('coverageRadius', coverageRadius);
			}
		}
	});

	return User;
};