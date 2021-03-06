'use strict';

module.exports = function (sequelize, dataTypes) {

	var Abuse = sequelize.define('Abuse', {
		id: {
			type: dataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		description: {
			type: dataTypes.CHAR(255),
			allowNull: false,
			validate: {
				max: {
					args: 255,
					msg: 'Max permitted is 255'
				}
			}
		},
		date: {
			type: dataTypes.DATE,
			allowNull: false
		}
	}, {
		timestamps: false,
		tableName: 'abuse',
		freezeTableName: true,
		underscored: false,
		classMethods: {
			associate: function (models) {
				Abuse.belongsTo(models.User, {
					foreignKey: {
						name: 'userId',
						allowNull: false
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				});
				Abuse.belongsTo(models.AbuseCategory, {
					foreignKey: {
						name: 'abuseCategoryId',
						allowNull: false
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				});
				Abuse.belongsTo(models.Report, {
					foreignKey: {
						name: 'reportId',
						allowNull: false
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				});
			}
		}
	});

	return Abuse;
};