const express=require('express');
const router=express.Router();
const passport=require("passport");
const usercontroller=require("../../controllers/user_controller");
const todocontroller=require("../../controllers/todo_controller");


//for user signup
router.post('/signup',usercontroller.signup)
//for user sigin and Token generation
router.get('/signin',usercontroller.signin);
//Creating Todo for a user
router.post('/create-todo',passport.authenticate('jwt',{session:false}),todocontroller.createTodo);
//Updating The todo
router.post('/update/:id',passport.authenticate('jwt',{session:false}),todocontroller.update);
//Deleting the todo from db
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),todocontroller.delete);
//filtering the todo by date and pagination
router.get('/todo',todocontroller.todo);
module.exports=router;