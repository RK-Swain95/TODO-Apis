const express=require('express');
const router=express.Router();
const passport=require("passport");
const usercontroller=require("../../controllers/user_controller");
const todocontroller=require("../../controllers/todo_controller");

router.post('/signup',usercontroller.signup)
router.get('/signin',usercontroller.signin);

router.post('/create-todo',passport.authenticate('jwt',{session:false}),todocontroller.createTodo);

router.post('/update/:id',passport.authenticate('jwt',{session:false}),todocontroller.update);

router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),todocontroller.delete);

router.get('/todo',todocontroller.todo);
module.exports=router;