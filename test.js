const UserModel = require("./model/UserModel");

UserModel.getUserToken('222').then(res => {
  console.log(res)
})