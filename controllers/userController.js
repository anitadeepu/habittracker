const bcrypt = require('bcrypt');
const User = require("../models/User");
const authenticationHelper = require("./../helpers/authenticationHelper");

exports.signupUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User();
        
        
        user.userName = req.body.userName;
        user.email = req.body.email;
        user.hashOfPassword = hashedPassword;

        await user.save();

        return res.status(200).json({message: "User signed up"});
        
    } catch (error) {
        return res
        .status(400)
        .json({message: "Something went wrong signing up the user", error});
    }
};

exports.signinUser = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    
    if(user === null) {
        return res
        .status(404)
        .json({message: "User with that email was not found"});
    }
    try {
        const checkPassword = await bcrypt.compare(req.body.password, user.hashOfPassword);
        if(checkPassword) {
            const token = await authenticationHelper.generateToken(user);

            return res
            .status(200)
            .cookie("jwt", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"  
            })
            .json({
                message: "You are successfully logged in", user: {username: user.userName}
            });
        } else {
            return res.status(400).json({message: "Password incorrect"});
        }
    } catch(error) {
        console.log("The error", error);
        return res.status(400).json({message: "sign in error"});
    }
};


exports.logout = async (req, res) => {
    res
    .clearCookie("jwt",{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })
    .json({message: "You are logged out"});
};
