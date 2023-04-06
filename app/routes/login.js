const express = require('express')
const router = express.Router();
// router.use(require("../middlewares/jsontoken"))
const fn = require('./functions');
router.post("/signin", async (req, res, next) => {
    console.log("req", req.body)
    let data = await fn.signin(req.body)
    res.send(data)
})

module.exports = router;