const { generateToken } = require("../config/jwtTokens");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    //User are already exist
    throw new Error("User Already Exists");
  }
});

const loginUserCrt = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  // check if user exist aur not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatchd(password))) {
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Creadentail");
  }
});

// Update a User
const updateaUser = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    try{
        const updateUser = await User.findByIdAndUpdate(id, {
            firstName:req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        }, {
            new: true,
        });
        res.json(updateUser);
    }catch (error){
        throw new Error(error);
    }
})

//Get all Users
const getAllUsers = asyncHandler(async(req, res) => {
    try{
        const getUsers = await User.find()
        res.json(getUsers);
    }catch (error){
        throw new Error(error);
    }
});

//Get a Single User

const getaUser = asyncHandler(async(req, res)=>{
    const { id } = req.params;
    try{
        const getSinleUser = await User.findById(id)
        res.json({getSinleUser})
    }catch (error){
        throw new Error(error);
    }
});

// Delet a User
const deleteaUser = asyncHandler(async(req, res)=>{
    const { id } = req.params;
    try{
        const deleteSinleUser = await User.findByIdAndDelete(id)
        res.json({deleteSinleUser})
    }catch (error){
        throw new Error(error);
    }
});

module.exports = { createUser, loginUserCrt, getAllUsers, getaUser, deleteaUser, updateaUser };
