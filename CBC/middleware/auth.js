    const dotenv = require('dotenv');
    const jwt = require('jsonwebtoken');
    dotenv.config();
    process.env.TOKEN_SECRET;
class auth{
    static generateAccessToken(username) {
        return jwt.sign({ username }, process.env.TOKEN_SECRET, { algorithm: 'HS512' },{ expiresIn: '7d' });
      }
     static authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
          console.log(err)
          if (err) return res.sendStatus(403)
          req.user = user
          next()
        })
      }
}
module.exports = auth;
