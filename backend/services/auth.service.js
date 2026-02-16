const userAccounts = require('../data/user.data');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.signup = async ({ name, email, password }) => {

    // const existingUser = await User.findOne({email});
    const existingUser = userAccounts.some(user => {
        return user.email === email;
    })

    if (existingUser) {
        throw new Error("Email already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // const user = await User.create({
    //     name, 
    //     email,
    //     password: hashedPassword
    // });

    const user = {
        _id: uuidv4(),
        name,
        email,
        password: hashedPassword
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    )
    const refreshToken = jwt.sign(
        {id: user._id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: "7d"}
    )

    user.refreshToken = refreshToken;
    userAccounts.push(user);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token,
        refreshToken
    };
};

// Login Service
exports.login = async ({ email, password }) => {

    // check user email
    const user = userAccounts.find(user => user.email === email);
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // check user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    // create tokens
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    )

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    )

    // Store refresh token on the user
    user.refreshToken = refreshToken;

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token,
        refreshToken
    }
}