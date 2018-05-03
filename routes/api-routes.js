var db = require("../models")

module.exports = function (app) {

  // adding new travel info to the database.
  app.post("/api/new", function (req, res) {
    db.travelinfo.create(req.body).then(function (result) {
      // res.end();
      res.json(result);
    });
  });

  // gets all user entries.
  app.get("/api/entry", function (req, res) {
    db.travelinfo.findAll(req.body).then(function (dbtravelinfo) {
      res.json(dbtravelinfo);
    });
    console.log("app.get api/entry: ", req.body);
  });

  // gets all user entries.
  app.get("/api/entry/:id", function (req, res) {
    db.travelinfo.findOne({
      where:{
        id: req.params.id
      }
    }).then(function (dbtravelinfo) {
      res.json(dbtravelinfo);
    });
    console.log("app.get api/entry: ", req.body);
  });

  app.get("/api/entry/data/:destination", function (req, res) {
    db.travelinfo.findAll({
      where:{
        destination: req.params.destination
      }
    }).then(function (dbtravelinfo) {
      console.log(dbtravelinfo)
      res.json(dbtravelinfo);
    });
    // console.log("app.get api/entry: ", req.body);
  });

  // delte for deleting record.
  app.delete("/api/delete/:id", function (req, res) {
    db.travelinfo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    });
  });

  //PUT route for updating travelinfos
  app.put("/api/update", function (req, res) {
    db.travelinfo.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function (dbtravelinfo) {
      res.json(dbtravelinfo);
    });
  });

} // module export function app ends here.

