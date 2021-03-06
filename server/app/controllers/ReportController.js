'use strict';

module.exports = function (app) {

  var ReportController = {
    create: function (req, res) {
      app.services.Report.create(req.body.report).then(function (result) {
        res.json(result);
      });
    },
    update: function (req, res) {
			req.body.report.id = req.params.id;
      app.services.Report.update(req.body.report).then(function (result) {
        res.json(result);
      });
    },
    delete: function (req, res) {
      app.services.Report.delete(req.params.id).then(function (result) {
        res.json(result);
      });
    },
    readById: function (req, res) {
      app.services.Report.readById(req.params.id).then(function (result) {
        res.json(result);
      });
    },
    readByCriteria: function (req, res) {
      app.services.Report.readByCriteria(req.query.criteria).then(function (result) {
        res.json(result);
      });
    },
		readAllWithUsers: function (req, res) {
      app.services.Report.readAllWithUsers().then(function (result) {
        res.json(result);
      });
    }
  };

  return ReportController;
};