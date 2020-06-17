const router = require('express').Router();
const db = require('../database/dbConfig')
const bcrypt = require('bcrypt')

router.post('/register', (req, res) => {
  const hash = bcrypt.hashSync(req.body.password,12)
  req.body.password = hash
  return db('users').insert(req.body)
    .then(resp => {
      if(resp){
        req.session.user = resp[0]
        res.status(201).json({message:`user created, welcome ${req.body.username}`})
      } else {
        res.status(404).json({message: 'user not created'})
      }
    })
    .catch(err => res.status(500).json({message:'something went wrong'}))
});

router.post('/login', (req, res) => {
  return db('users').where({username: req.body.username})
    .then(user => {
      if(user && bcrypt.compare(req.body.password,user.password)){
        req.session.user = user[0]
        res.status(200).json({message:`welcome back ${req.body.username}!`})
      } else {
        res.status(404).json({message: 'invalid credentials'})
      }
    })
    .catch(err => res.status(500).json({message:'something went wrong'}))
});

module.exports = router;
