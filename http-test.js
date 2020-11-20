const axios = require("axios")
axios({
  url: 'http://localhost:3000/api/product/buy',
  method: 'post',
  headers: {
    cookie: `token=3d2172418ce305c7d16d4b05597c6a59`
  },
  data: {
    item_id: 1
  }
}).then(res => {
  console.log(res)
})