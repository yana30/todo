/**
 * TodoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `TodoController.list()`
   */
  list: function (req, res) {

    Todo.find({status: "New"}).exec(function (err, new_records, message) {
      Todo.find({status: "Completed"}).exec(function (err, completed_records) {
        if (new_records.length === 0 && completed_records.length===0) {
          res.view('pages/todoEmpty', {new_records, completed_records})
        }
        else if (new_records.length !==0 && completed_records.length === 0) {
          res.view('pages/completedEmpty', {new_records, completed_records})
        }
        else if (new_records.length ===0 && completed_records.length !== 0) {
          res.view('pages/newEmpty', {new_records, completed_records})
        }
        else {
          res.view('pages/todo', {new_records, completed_records});
        }
      });
    });
  },

  /**
   * `TodoController.create()`
   */
  create: function (req, res) {
    var item = req.param("item");
    var owner = req.param("owner");
    console.log(item);
    console.log(owner);
    Todo.create({item: item, owner: owner}).exec(function (err, records) {
      if (err) {
        return res.serverError(err);
      }
      return res.redirect("/todo");
    });
  },

  /**
   * `TodoController.edit()`
   */
  edit: function (req, res) {
    var id = req.param("id");
    Todo.find({id: id}).exec(function (err, record) {
      res.view('pages/todoEdit', {record});
      console.log(record);
    });
  },

  /**
   * `TodoController.update()`
   */
  update: function (req, res) {
    var id = req.param("id");
    var item = req.param("item");
    var owner = req.param("owner");
    console.log('new value ' + item);
    console.log('new value ' + owner);
    console.log('id ' + id);
    Todo.update({id: id}, {item: item, owner: owner}).exec(function afterwards(err, updated) {
      return res.redirect("/todo");
    });
  },

  /**
   * `TodoController.delete()`
   */
  delete: function (req, res) {
    var id = req.param("id");
    Todo.destroy({id: id}).exec(function (err) {
      if (err) {
        return res.negotiate(err);
      }
      console.log('record deleted.');
      return res.redirect("/todo");
    });
  },

  /**
   * `TodoController.complete()`
   */
  complete: function (req, res) {
    var id = req.param("id");
    var status = req.param("status");
    console.log('status ' + status);
    Todo.update({id:id},{status: "Completed"}).exec(function afterwards(err, updated) {
      return res.redirect("/todo");
    });
  },

  /**
   * `TodoController.return()`
   */
  return: function (req, res) {
    var id = req.param("id");
    var status = req.param("status");
    console.log('status ' + status);
    Todo.update({id:id},{status: "New"}).exec(function afterwards(err, updated) {
      return res.redirect("/todo");
    });
  }
};
