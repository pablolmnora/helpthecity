'use strict';

var models = require('../models'),
	sequelize = models.sequelize;

var UpDAO = {
	create: function (up) {
		return sequelize.query('INSERT INTO up(date, "userId", "reportId") VALUES (to_timestamp(?), ?, ?)', {
			replacements: [
        up.date,
        up.userId,
				up.reportId
      ],
			type: sequelize.QueryTypes.INSERT,
			model: models.Up
		}).then(function (id) {
			return id[0];
		}).catch(function (err) {
			return err.message;
		});
	},
	update: function (up) {
		return sequelize.query('UPDATE up SET date=to_timestamp(?), "userId"=?, "reportId"=? WHERE "userId" = ? AND "reportId" = ?', {
			replacements: [
        up.date,
        up.userId,
        up.reportId,
        up.userId,
        up.reportId
      ],
			type: sequelize.QueryTypes.UPDATE,
			model: models.Up
		}).then(function (id) {
			return id[0];
		}).catch(function (err) {
			return err.message;
		});
	},
	delete: function (userId, reportId) {
		return sequelize.query('DELETE FROM up WHERE "userId" = ? AND "reportId" = ?', {
			replacements: [
				userId,
				reportId
			],
			type: sequelize.QueryTypes.DELETE,
			model: models.Up
		}).then(function (ok) {
			return ok[0];
		}).catch(function (err) {
			return err.message;
		});
	},
	readById: function (userId, reportId) {
		return sequelize.query('SELECT * FROM up WHERE "userId" = ? AND "reportId" = ?', {
			replacements: [
				userId,
				reportId
			],
			type: sequelize.QueryTypes.SELECT,
			model: models.Up
		}).then(function (up) {
			return up[0];
		}).catch(function (err) {
			return err.message;
		});
	},
	readByCriteria: function (criteria) {
		return sequelize.query(createQuery(criteria), {
			type: sequelize.QueryTypes.SELECT,
			model: models.Up
		}).then(function (ups) {
			return ups;
		}).catch(function (err) {
			return err.message;
		});
	}
};

module.exports = UpDAO;

function createQuery(criteria) {
	var query = 'SELECT * FROM up WHERE 1=1';
	if (criteria.date) {
		query += ' AND date = \'to_timestamp(' + criteria.date + '\')';
	}
	if (criteria.userId) {
		query += ' AND "userId" = ' + criteria.userId;
	}
	if (criteria.reportId) {
		query += ' AND "reportId" = ' + criteria.reportId;
	}
	return query;
};