const { execute } = require("../mysql");
const { md5 } = require("../md5");

async function isExistingUser(username) {
  const sql = `select count(*) as count from user where username='${username}'`;
  const res = await execute(sql);
  if (Array.isArray(res) && res.length > 0) {
    return res[0].count > 0;
  } else {
    return true;
  }
}

async function isRightPassword(username, password) {
  const sql = `select count(*) as count from user where username='${username}' and password=${password}`;
  const res = await execute(sql);
  if (Array.isArray(res) && res.length > 0) {
    return res[0].count > 0;
  } else {
    return false;
  }
}

// get user's id by token from cookie
async function getUserIdByToken(token) {
  const sql = `select id from user where token='${token}'`;
  const res = await execute(sql);
  if (Array.isArray(res) && res.length > 0) {
    return res[0].id;
  } else {
    return null;
  }
}

// whether user exits or not
async function isExist(token) {
  const id = await getUserIdByToken(token);
  return Boolean(id);
}

async function Register(username, password) {
  const token = md5(username + password);
  const sql = `insert into user (username, password, token)values('${username}', '${password}', '${token}')`;
  const res = await execute(sql);
  if (res && Number.isInteger(res.insertId)) {
    return true;
  } else {
    return false;
  }
}

async function getUserToken(username) {
  const sql = `select token from user where username='${username}'`;
  const res = await execute(sql);
  if (Array.isArray(res) && res.length > 0) {
    return res[0].token;
  } else {
    return null;
  }
}



module.exports = {
  isExistingUser,
  Register,
  isRightPassword,
  getUserToken,
  getUserIdByToken,
  isExist
}