const p = require('./db')

// async function getTools2() {
//   return p.query(queries.getTools).then(results => results.rows)
// }

async function pQuery(query, arguments = []) {
  return (await p.query(query, [...arguments])).rows
}

const qString = {
  getTools: 'SELECT * FROM tools',
  getToolByIdInCount: `SELECT date_of_completion, _count FROM _counts WHERE id_tool = $1`,
  setCountsItem: `INSERT INTO _counts(region,job_board,id_tool,date_of_completion,_count) VALUES('Russia','HeadHunter',$1,$2,$3)`,
  getCounts: `SELECT * FROM _counts WHERE region = $1 AND job_board = $2`,

  getCategories: `SELECT * FROM categories`,

  deleteRefreshToken: `DELETE FROM auth WHERE refresh_token = $1`,
  updateRefreshToken: `UPDATE auth SET refresh_token = $1`,
  getTokenByUserId: `SELECT * FROM auth WHERE id_user = $1`,

  getLastDate: `SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1`,
  createNewDate: `INSERT INTO date_of_completion(date_of_completion) VALUES($1)`,

  getUserById: `SELECT * FROM auth WHERE id_user = $1`,
  getUserIdByToken: `SELECT * FROM users WHERE id_user = $1`,
  getUserByEmail: `SELECT * FROM users WHERE user_email = $1`,
  changeUsersStatus: `UPDATE users SET is_active = true WHERE activation_link = $1`,
  getUserByActivationLink: `SELECT * FROM users WHERE activation_link = $1`,
  createAuth: `INSERT INTO auth (id_user, refresh_token) VALUES ($1, $2)`,
  createUser: `INSERT INTO users(user_email, user_password, is_active, ip_or_browser, date_of_registration, activation_link) VALUES($1, $2, false, 'null', $3, $4) RETURNING *`,
  getTokenByToken: 'SELECT * FROM auth WHERE  refresh_token = $1',
}

class Queries {
  async getLists() {
    return pQuery(qString.getLists)
  }

  async getTools() {
    return pQuery(qString.getTools)
  }

  async getToolByIdInCount(id_tool) {
    return pQuery(qString.getToolByIdInCount, arguments)
  }

  async getCategories() {
    return pQuery(qString.getCategories)
  }

  async getCounts(region, jobBoard) {
    return pQuery(qString.getCounts, arguments)
  }

  async setCountsItem(id_tool, lastDateId, countVacancy) {
    return pQuery(qString.setCountsItem, arguments)
  }

  async deleteRefreshToken(refreshToken) {
    return pQuery(qString.deleteRefreshToken, arguments)
  }

  async updateRefreshToken(refreshToken) {
    return pQuery(qString.updateRefreshToken, arguments)
  }

  async getLastDate() {
    return pQuery(qString.getLastDate, arguments)
  }

  async createNewDate(date) {
    return pQuery(qString.createNewDate, arguments)
  }

  async getUserById(userId) {
    return pQuery(qString.getUserById, arguments)
  }

  async getUserByActivationLink(activationLink) {
    return pQuery(qString.getUserByActivationLink, arguments)
  }

  async getUserByEmail(email) {
    const user = await pQuery(qString.getUserByEmail, arguments)
    return user[0]
  }

  async getUserIdByToken(token) {
    return pQuery(qString.getUserIdByToken, arguments)
  }

  async createAuth(userId, refreshToken) {
    return pQuery(qString.createAuth, arguments)
  }

  async createUser(email, hashPassword, currentDate, activationLink) {
    const user = await pQuery(qString.createUser, arguments)
    return user[0]
  }

  async changeUsersStatus(activationLink) {
    return pQuery(qString.changeUsersStatus, arguments)
  }

  async getDates() {
    return (await p.query(`SELECT * FROM date_of_completion`)).rows
  }

  async getTokenByToken(token) {
    return pQuery(qString.getTokenByToken, arguments)
  }
}

module.exports = new Queries()
