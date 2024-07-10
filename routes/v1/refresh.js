const User = require('../../model/user');
const jwt = require('jsonwebtoken');
const Router = require('express').Router()
const {generateAccessToken} = require('../../utils/auth')
const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 

    const currentUser = {
        name: foundUser.firstname + ' ' + foundUser.lastname,
        email: foundUser.email,
        well: foundUser.well,
        roles: foundUser.roles,
        unit: foundUser.unit
      }
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            //const roles = Object.values(foundUser.roles);
            const accessToken = generateAccessToken(foundUser)
            res.json({ currentUser, token:accessToken })
        }
    );
}
Router.get('/', handleRefreshToken);
module.exports = Router