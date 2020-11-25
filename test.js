const UserModule = require("./model/UserModel");


UserModule.getUserToken('root').then(res => {
  console.log(res)
})