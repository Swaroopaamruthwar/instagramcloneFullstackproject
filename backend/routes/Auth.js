const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const bodyparser = require("body-parser");
const { body, param, validationResult } = require('express-validator');
router.use(bodyparser());
router.use(bodyparser.urlencoded({ extended: false }));
router.post("/register", [ body('name', 'Enter a valid name').isLength({ min: 3 }),
body('email', 'Enter a valid email').isEmail(),
body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
    console.log(req.body)
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return res.status(400).json({success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
    
        // Create a new user
        user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });
        const data = {
          user: {
            id: user.id
          }
        }
        const authToken = jwt.sign(data, process.env.SECRET);
    
    
        // res.json(user)
        success=true;
        res.json({success,authToken })
    
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

router.post("/login",  [body('email', 'Enter a valid email').isEmail(),
body('password', 'Password cannot be blank').exists()], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({success, error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, process.env.SECRET);
    success = true;
    res.json({ success, authToken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

module.exports = router;