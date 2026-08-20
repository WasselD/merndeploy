const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const isAuth = require("../middleware/isAuth");
const { registerValidation, loginValidation, validation } = require("../middleware/validator");

router.get("/test", (req,res)=>{
    res.status(200).json({msg: "mrgl"})
})

router.post("/register", registerValidation(), validation, register)
router.post("/login", loginValidation(), validation, login)
router.get("/current",isAuth,(req,res)=>{
    res.json(req.user)
})
module.exports = router;