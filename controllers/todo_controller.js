const User = require("../models/user");
const jwt = require("jsonwebtoken");
const TODO = require("../models/todo");
//Creating Todo for a user
module.exports.createTodo = async function (req, res) {
  try {
    let user = await User.findById(req.user.id);
    if (user) {
      let todo = await TODO.create({
        title: req.body.title,
        date: req.body.date,
        Email: req.user.Email,
      });
      return res.status(200).json({
        messsage: "todo created successful",
        Todo: todo,
      });
    } else {
      return res.status(200).json({
        messsage: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "error in creating todo !!",
    });
  }
};
//Updating The todo
module.exports.update = async function (req, res) {
  try {
    let user = await User.findById(req.user.id);
    console.log(user);
    if (user) {
      let updatted = await TODO.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        date: req.body.date,
        Email: req.user.Email,
      });
      updatted.save();
      console.log(updatted);
      let data = await TODO.findById({ _id: req.params.id });
      return res.status(200).json({
        messsage: "todo updatedsuccessful",
        Todo: data,
      });
    } else {
      return res.status(200).json({
        messsage: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "error in updating todo !!",
    });
  }
};
//Deleting the todo from db
module.exports.delete = async function (req, res) {
  try {
    let user = await User.findById(req.user.id);
    if (user) {
      let deleted = await TODO.findByIdAndDelete({ _id: req.params.id });
      return res.status(200).json({
        messsage: "todo deleted successful",
        Todo: deleted,
      });
    } else {
      return res.status(200).json({
        messsage: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "error in updating todo !!",
    });
  }
};

//filtering the todo by date and pagination
module.exports.todo = async function (req, res) {
  try {
    var query = {
      date: {
        $gte: new Date(req.query.fromdate).toISOString().split("T")[0],
        $lte: new Date(req.query.todate).toISOString().split("T")[0],
      },
    };
    const { page = 1, pagesize = 10 } = req.query;
    console.log(query);

    const todo = await TODO.find(query)
      .limit(pagesize * 1)
      .skip((page - 1) * pagesize)
      .exec();

    const count = await TODO.countDocuments();

    return res.status(200).json({
      totalPages: Math.ceil(count / pagesize),
      currentPage: page,
      data: todo,
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "error in updating todo !!",
    });
  }
};
