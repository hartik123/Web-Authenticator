const jwt = require('jsonwebtoken');
const userAccounts = require('../data/user.data');


module.exports = async (req, res, next)=>{
try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            message: 'Authentication required'
        });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = userAccounts.find(user=>user._id===decoded.id);
    if(!user){
        return res.status(401).json({
            message: "User no longer exists"
        });
    }

    req.user = {
        _id: user._id,
        name: user.name,
        email: user.email
    };
    next();
}
catch(err){ 
    return res.status(401).json({
        message: "Invalid or expired token"
    })

}
};
