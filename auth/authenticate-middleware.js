/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const db = require('../database/dbConfig')
const bcrypt = require('bcrypt')

module.exports = (req, res, next) => {
  if(req.session && req.session.user){
    return next()
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
  
};
