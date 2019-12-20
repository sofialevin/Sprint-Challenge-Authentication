const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('users')
    .select('id', 'username');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'password')
    .first();
}

function add(user) {
  return db('users')
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    })
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}