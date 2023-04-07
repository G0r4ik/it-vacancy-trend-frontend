const pool = require('./database')

// async function getTools2() {
//   return p.query(queries.getTools).then(results => results.rows)
// }

async function pQuery(query, ...arguments_) {
  const resp = await pool.query(query, [...arguments_])
  return resp.rows
}

const qString = {
  getTools: 'SELECT * FROM tools',
  getToolByIdInCount: `SELECT date_of_completion, _count FROM _counts WHERE id_tool = $1`,
  setCountsItem: `INSERT INTO _counts(region,job_board,id_tool,date_of_completion,_count) VALUES('Russia','HeadHunter',$1,$2,$3)`,
  getCounts: `SELECT * FROM _counts WHERE region = $1 AND job_board = $2`,

  getCategories: `SELECT * FROM categories`,

  deleteRefreshToken: `DELETE FROM auth WHERE refresh_token = $1`,
  updateRefreshToken: `UPDATE auth SET refresh_token = $1`,

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

  async getToolByIdInCount(toolId) {
    return pQuery(qString.getToolByIdInCount, toolId)
  }

  async getCategories() {
    return pQuery(qString.getCategories)
  }

  async getCounts(region, jobBoard) {
    return pQuery(qString.getCounts, region, jobBoard)
  }

  async setCountsItem(toolId, lastDateId, countVacancy) {
    return pQuery(qString.setCountsItem, toolId, lastDateId, countVacancy)
  }

  async deleteRefreshToken(refreshToken) {
    return pQuery(qString.deleteRefreshToken, refreshToken)
  }

  async updateRefreshToken(refreshToken) {
    return pQuery(qString.updateRefreshToken, refreshToken)
  }

  async getLastDate() {
    return pQuery(qString.getLastDate)
  }

  async createNewDate(date) {
    return pQuery(qString.createNewDate, date)
  }

  async getUserById(userId) {
    return pQuery(qString.getUserById, userId)
  }

  async getUserByActivationLink(activationLink) {
    return pQuery(qString.getUserByActivationLink, activationLink)
  }

  async getUserByEmail(email) {
    const user = await pQuery(qString.getUserByEmail, email)
    return user[0]
  }

  async getUserIdByToken(token) {
    return pQuery(qString.getUserIdByToken, token)
  }

  async createAuth(userId, refreshToken) {
    return pQuery(qString.createAuth, userId, refreshToken)
  }

  async createUser(email, hashPassword, currentDate, activationLink) {
    const user = await pQuery(
      qString.createUser,
      email,
      hashPassword,
      currentDate,
      activationLink
    )
    return user[0]
  }

  async changeUsersStatus(activationLink) {
    return pQuery(qString.changeUsersStatus, activationLink)
  }

  async getDates() {
    const resp = await pool.query(`SELECT * FROM date_of_completion`)
    return resp.rows
  }

  async getTokenByToken(token) {
    return pQuery(qString.getTokenByToken, token)
  }
}

module.exports = new Queries()
