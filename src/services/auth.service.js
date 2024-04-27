const {userRepository} = require('../repository')
const ResponseError = require('../utils')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken')
require('dotenv').config();


const register = async (params) => {
  const {username, password, nama} = params
  const cekUsername = await userRepository.getUserByUsername(username)
  if(cekUsername){
    throw err = new ResponseError(409, "email already exist")
  }
  
  const saltRounds = 10; // Jumlah putaran salt (penambahan acak)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const result = await userRepository.createUser(username, hashedPassword, nama)
  if(!result){
    throw err = new ResponseError(500, 'Internal Server Error')
  }
  return result
}

const login = async (params) => {
  const {username, password} = params
  
  const user = await userRepository.getUserByUsername(username)
  
  if(!user){
    throw err = new ResponseError(401, "email or password wrong")
  }
  const cekPassword = await bcrypt.compare(password, user.password)
  if(!cekPassword){
    throw err = new ResponseError(401, "email or password wrong")
  }
  const payload = {
    username: username
  }
  const key = process.env.JWT_SECRET
  const aksesToken = jwt.sign(payload, key,{expiresIn: '2h'});
  return aksesToken
}
module.exports = {register, login}