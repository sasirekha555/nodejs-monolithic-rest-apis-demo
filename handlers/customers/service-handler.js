'use strict';

const Customer = require('./models/customers-model');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


const createCustomer = (data) => {
  if(data.password){
    data.password = bcrypt.hashSync(data.password, salt);
  }
    return Customer.create(data);   
}


  module.exports = {
    createCustomer
  }