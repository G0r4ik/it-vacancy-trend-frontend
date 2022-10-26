const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const p = require('../db')
const bcrypt = require('bcrypt')
const currentDate = require('../helpers/getCurrentDate')
const uuid = require('uuid')

class UserService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    })
    return { refreshToken, accessToken }
  }

  saveToken(userId, refreshToken) {
    p.query(`SELECT * FROM auth WHERE id_user = '${userId}'`, (e, results) => {
      if (results.rows.length) {
        p.query(
          `UPDATE auth SET refresh_token = '${refreshToken}'`,
          (e, results) => {}
        )
      } else {
        p.query(
          `INSERT INTO auth (id_user, refresh_token) VALUES (${userId}, '${refreshToken}')`,
          (e, results) => {}
        )
      }
    })
  }

  sendMessage(email, link) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'eforfora@gmail.com',
        pass: 'tubzteysoybrjuki',
      },
    })
    transporter.sendMail({
      to: email,
      text: `Your link: ${link}`,
    })
  }

  async hasUserLoginInDB(login) {
    return new Promise((res, rej) => {
      p.query(
        `SELECT * FROM users WHERE user_login = '${login}'`,
        (e, results) => {
          res(!!results.rows.length)
        }
      )
    })
  }

  async hasUserMailInDB(email) {
    return new Promise((res, rej) => {
      p.query(
        `SELECT * FROM users WHERE user_email = '${email}'`,
        (e, results) => {
          res(!!results.rows.length)
        }
      )
    })
  }

  async registrationUser(tokens, login, password, email) {
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    p.query(
      `INSERT INTO users(user_email, user_login, user_password,is_active, ip_or_browser, date_of_registration, activation_link)
          VALUES('${email}','${login}','${hashPassword}', false, 'null', '${currentDate()}', '${activationLink}');
          `,
      (e, results) => {
        p.query(
          `SELECT currval(pg_get_serial_sequence('users', 'user_id'));`,
          (e, results) => {
            const idUser = results.rows[0].currval
            this.sendMessage(
              email,
              `${
                process.env.NODE_ENV == 'production'
                  ? process.env.SERVER_ADDRESS
                  : 'http://localhost:5000'
              }/activate?link=${activationLink}&user=${login}`
            )
            this.saveToken(idUser, tokens.refreshToken)
            console.log('Регистрация почти прошла =)')
          }
        )
      }
    )
  }

  activate(activationLink, userLogin) {
    return p.query(
      `SELECT * FROM users WHERE user_login = '${userLogin}' AND activation_link = '${activationLink}'`,
      (e, results) => {
        if (!results.rows.length) {
          return 'Что-то пошло не так'
        }
        p.query(
          `UPDATE users SET is_active = true WHERE user_login = '${userLogin}' AND activation_link = '${activationLink}'`,
          e => {
            return 'УСПЕХ!'
          }
        )
      }
    )
  }

  async login(login, password) {
    return p
      .query(
        `SELECT * FROM users WHERE (user_login = '${login}' OR user_email = '${login}')`
      )
      .then(async results => {
        if (!results.rows.length) {
          console.log('Проверьте введеные данные')
          return 'Проверьте введеные данные'
        }
        const hashPassword = await bcrypt.compare(
          password,
          results.rows[0].user_password
        )
        if (!hashPassword) return 'Неправильный пароль'
        const idUser = results.rows[0].user_id
        const tokens = this.generateToken({ login, email })
        this.saveToken(idUser, tokens.refreshToken)
        return { ...tokens, user: { login, email } }
      })
      .catch(e => {
        // console.log(e)
      })
    // const isEmailEquals = await this.hasUserMailInDB(login)
    // const isLoginEquals = await this.hasUserLoginInDB(login)
    // if (!isEmailEquals && !isLoginEquals) {
    //   console.log('Не найдено человека с такими данными')
    //   return
    // }
  }

  async logout(refreshToken) {
    p.query(`DELETE FROM auth WHERE refresh_token = '${refreshToken}'`)
  }
}

module.exports = new UserService()
