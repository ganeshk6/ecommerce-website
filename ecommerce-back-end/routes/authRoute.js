const express = require("express");
const { createUser, loginUserCrt, getAllUsers, getaUser, deleteaUser, updateaUser } = require("../controller/userController");
const router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUserCrt);
router.get('/all-users', getAllUsers);
router.get('/:id', getaUser);
router.delete('/:id', deleteaUser);
router.put('/:id', updateaUser);

module.exports = router;