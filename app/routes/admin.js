var express = require('express');
const router = express.Router();
const fn = require('./functions')

router.post("/getdepartment", async (req, res) => {
    console.log("req..........", req.body)
    const data = await fn.department(req.body)
    console.log("data..........", data)
    res.send(data)
})

router.post("/signup", async (req, res) => {
    const signupdata = await fn.signup(req.body)
    console.log("signupdata..........", signupdata)
    res.send(signupdata)
})

router.post("/confirm", async (req, res) => {
    const confirmuser = await fn.confirmuser(req.body)
    res.send(confirmuser)
})
module.exports = router;