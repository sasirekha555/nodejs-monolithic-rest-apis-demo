'use strict';

const User = require('./models/users-model');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


const createUser = (data) => {
  if(data.password){
    data.password = bcrypt.hashSync(data.password, salt);
  }
    return User.create(data);   
}


  module.exports = {
    createUser
  }