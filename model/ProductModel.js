const { execute } = require("../mysql");
const UserModel = require("./UserModel");

// get products list by classification, if classification equlas '', it returns all.
async function getProducts(classification) {
  const sql = `select * from product where classification like '%${classification}%'`;
  const res = await execute(sql);
  return res;
}

async function getProductsByKeyword(keyword) {
  const sql = `select * from product where name like '%${keyword}%'`;
  const res = await execute(sql);
  return res;
}

// get one product by id
async function getItemById(id) {
  const sql = `select * from product where id=${id}`;
  const res = await execute(sql);
  if (Array.isArray(res) && res.length > 0) {
    return res[0];
  } else {
    return {};
  }
}

// whether user has access to edit, delete or not
async function hasAccess(item_id, token) {
  const user_id = await UserModel.getUserIdByToken(token);
  const sql = `select count(*) as count from product where user_id=${user_id} and id=${item_id}`;
  const res = await execute(sql);
  if (Array.isArray(res) && res.length > 0 && res[0].count > 0) {
    return true;
  } else {
    return false;
  }
}


// edit product info
async function editItem(item) {
  const {
    item_id,
    img,
    name,
    detail,
    price,
    phone,
    status,
    address,
    classification,
  } = item;

  const sql = `update product set 
    img = '${img}',
    name = '${name}',
    detail = '${ detail }',
    price = '${ price }',
    phone = '${ phone }',
    status = '${ status }',
    address = '${ address }',
    classification = '${ classification }' 
    where id=${item_id}
  `;
  const res = await execute(sql);
  if (res && res.affectedRows === 1) {
    return true;
  } else {
    return false;
  }
}

// delete a product
async function deleteItem(id) {
  const sql = `delete from product where id=${id}`;
  const res = await execute(sql);
  if (res && res.affectedRows === 1) {
    return true;
  } else {
    return false;
  }
}

// add a new product
async function addItem(item, user_id) {
  const {
    img,
    name,
    detail,
    price,
    phone,
    status,
    address,
    classification,
  } = item;

  const sql = `insert into product 
    (img, name, detail, price, phone, status, address, user_id, classification)
    values
    ('${img}', '${name}', '${detail}', '${price}', '${phone}', '${status}', '${address}', '${user_id}', '${classification}')`;

  const res = await execute(sql);
  if (res && Number.isInteger(res.insertId)) {
    return true;
  } else {
    return false;
  }
}

// buy a product
async function buyItem(item_id) {
  const res = await deleteItem(item_id);
  return res;
}


module.exports = {
  getProducts,
  getItemById,
  hasAccess,
  editItem,
  deleteItem,
  addItem,
  buyItem,
  getProductsByKeyword
}