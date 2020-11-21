var express = require("express");
var app = express();
var path = require("path");
var faker = require("faker");
const cookieParser = require("cookie-parser");
const { Response } = require("./Response");
const UserModel = require("./model/UserModel");
const ProductModel = require("./model/ProductModel");

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/main.html"));
});

app.get("/api/products", async (req, res) => {
  try {
    const { classification } = req.query;
    const products = await ProductModel.getProducts(classification);
    res.send(Response(0, "ok", products));
  } catch (err) {
    res.send(Response(1, err.stack, []));
  }
});

app.get("/api/products/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    const products = await ProductModel.getProductsByKeyword(keyword);
    res.send(Response(0, "ok", products));
  } catch(err) {
    res.send(Response(1, err.stack, []));
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ProductModel.getItemById(id);
    res.send(Response(0, "ok", item));
  } catch (err) {
    res.send(Response(1, err.stack, {}));
  }
});

app.post("/api/product/add", async (req, res) => {
  try {
    const token = req.cookies.token;
    const is_exist = await UserModel.isExist(token);
    if (!is_exist) {
      res.send(Response(1, "Non-existent user", {}));
      return;
    }

    const new_item = req.body;
    const user_id = await UserModel.getUserIdByToken(token);
    const add_res = await ProductModel.addItem(new_item, user_id);
    if (add_res) {
      res.send(Response(0, "Product added successfully!", {}));
    } else {
      res.send(Response(1, "Failed to add product", {}));
    }
  } catch (err) {
    res.send(Response(1, err.stack, {}));
  }
});

app.post("/api/product/update", async (req, res) => {
  try {
    const token = req.cookies.token;
    // item_id
    const item = req.body;
    // check access
    const has_access = await ProductModel.hasAccess(item.item_id, token);
    if (!has_access) {
      res.send( Response(1, 'You do not have permission to modify this product!', {})  );
      return;
    } 
    // update product info
    const update_res = await ProductModel.editItem(item);
    if (update_res) {
      res.send( Response(0, 'Product successfully updated!', {}) );
    } else {
      res.send( Response(1, 'Failed to update product', {}) );
    }
  } catch(err) {
    res.send(Response(1, err.stack, {}));
  }
});

app.post('/api/product/buy', async (req, res) => {
  try {
    // check is my user
    const token = req.cookies.token;
    const is_exist = await UserModel.isExist(token);
    if (!is_exist) {
      res.send(Response(1, "Non-existent user", {}));
      return;
    }
    
    // buy item
    const item_id = req.body.item_id;
    const buy_res = await ProductModel.buyItem(item_id);
    if (buy_res) {
      res.send( Response(0, 'buy successfully!', {}) );
    } else {
      res.send( Response(1, 'buy failly!', {}) );
    }

  } catch(err) {
    res.send(Response(1, err.stack, {}));
  }
});

app.post("/api/product/delete", async (req, res) => {
  try {
    const item_id = req.body.item_id;
    const token = req.cookies.token;
    // check access
    const has_access = await ProductModel.hasAccess(item_id, token);
    if (!has_access) {
      res.send( Response(1, 'you have not the access!', {})  );
      return;
    } 
    // delete item
    const delete_res = await ProductModel.deleteItem(item_id);
    if (delete_res) {
      res.send( Response(0, 'delete product successfully!', {}) );
    } else {
      res.send( Response(1, 'delete product failly!', {}) );
    }
  } catch(err) {
    res.send(Response(1, err.stack, {}));
  }
});

app.post("/api/signin", async (req, res) => {
  let auth = req.body;
  if (!auth) {
    res.send(Response(1, `cant't get account and password`, {}));
    return;
  }
  try {
    const { username, password } = auth;
    // check account
    const is_existing_username = await UserModel.isExistingUser(username);
    if (!is_existing_username) {
      res.send(Response(1, `username is not exists`, {}));
      return;
    }
    // check password
    const is_right_password = await UserModel.isRightPassword(
      username,
      password
    );
    if (!is_right_password) {
      res.send(Response(1, `password is not right!`, {}));
      return;
    }
    // set cookie
    const token = await UserModel.getUserToken(username);
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.send(Response(0, "register successfully", {}));
  } catch (err) {
    res.send(Response(1, err.stack, {}));
  }
});

app.post("/api/signup/", async (req, res) => {
  let auth = req.body;
  if (!auth) {
    res.send(Response(1, `cant't get account and password`, {}));
    return;
  }
  try {
    // check account
    const { username, password } = auth;
    const is_existing_username = await UserModel.isExistingUser(username);
    if (is_existing_username) {
      res.send(Response(1, `username is existing`, {}));
      return;
    }
    // register new user
    const register_res = await UserModel.Register(username, password);
    if (register_res) {
      res.send(Response(0, `register successfully!`, {}));
    } else {
      res.send(Response(1, `register failly!`, {}));
    }
  } catch (err) {
    res.send(Response(1, err.stack, {}));
  }
});



let port = process.env.PORT;


app.listen(port, (req, res) => {
  console.log("Server is running successfullly!");
});
