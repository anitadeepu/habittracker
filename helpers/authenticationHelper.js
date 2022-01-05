const jwt = require("jsonwebtoken");



exports.generateToken = (user)  => {
    const payload = {sub: user._id};

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: "1h"},
            (error, asyncToken) => {
                if(error) {
                    reject(error);
                    return;
                }
                resolve(asyncToken);
            }
        );
    });
};