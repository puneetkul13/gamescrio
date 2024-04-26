const express = require("express")
const {createUser} =  require("../controllers/createUser");
const {getUser} =  require("../controllers/getUser");
const {updateUser} = require("../controllers/updateUser");
const {deleteUser} = require("../controllers/deleteUser");
const router = express.Router();
router.route("/createUser").post(createUser)
router.route("/getUser").get(getUser)
router.route("/updateUser/:userId").put(updateUser)
router.route("/deleteUser/:userId").delete(deleteUser);
module.exports = router