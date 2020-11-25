const { execute } = require("../database");
const MiniCrypt = require("../miniCrypt");
const miniCrypt = new MiniCrypt();
const { md5 } = require("../md5");

async function isExistingUser(username) {
  const sql = `select count(*) as count from users where username='${username}'`;
  const res = await execute(sql);
  if (Array.isArray(res) && res.length > 0) {
    return res[0].count > 0;
  } else {
    return true;
  }
}

async function Register(username, password) {
  const [salt, hash] = miniCrypt.hash(password);
  const token = md5(username + hash);
  const sql = `insert into users (username, salt, hash, token)values('${username}', '${salt}', '${hash}', '${token}')`;
  const res = await execute(sql);
  if (res) {
    return true;
  } else {
    return false;
  }
}

async function isRightPassword(username, password) {
  const sql = `select salt, hash from users where username='${username}'`;
  const res = await execute(sql);
  if (!Array.isArray(res) || res.length <= 0) {
    return false;
  }

  const { salt, hash } = res[0];
  return miniCrypt.check(password, salt, hash);
}

// get users's id by token(hash) from cookie
async function getUserIdByToken(token) {
  const sql = `select id from users where token='${token}'`;
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


async function getUserToken(username) {
  const sql = `select token from users where username='${username}'`;
  const res = await execute(sql);
  if (Array.isArray(res) && res.length > 0) {
    return res[0].token;
  } else {
    return null;
  }
}

async function getUserName(token) {
  const sql = `select username from users where token = '${token}'`;
  const res = await execute(sql);
  if (Array.isArray(res) && res.length > 0) {
    return res[0].username;
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
  isExist,
  getUserName
}