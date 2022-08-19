const express = require('express');
const needle = require('needle');
const cors = require('cors');
const Pool = require('pg').Pool;
const axios = require('axios');
const app = express();
app.use(cors());

// document.location.href =
//   error.response.data.errors[0].captcha_url +
//   '&backurl=' +
//   'http://127.0.0.1:5500/index.html';

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'vacna',
  password: 'zxczxc2013',
  port: 5432,
});

app.get('/getDate', (req, res) => {
  pool.query('SELECT * FROM date_of_completion', (e, results) => {
    res.status(200).json(results.rows);
  });
});

app.get('/getTools', (req, res) => {
  pool.query('SELECT * FROM tools', (e, results) => {
    res.status(200).json(results.rows);
  });
});

app.get('/getCategories', (req, res) => {
  pool.query('SELECT * FROM categories', (error, results) => {
    res.status(200).json(results.rows);
  });
});

app.get('/getCount', (req, res) => {
  pool.query(
    'SELECT * FROM count_in_indeed;SELECT * FROM count_in_hh',
    (error, results) => res.status(200).json(results)
  );
});

async function uploadDataToTheDatabase() {
  const start = new Date();

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth()).padStart(2, '0');
  const year = String(now.getFullYear()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const date = `${day}.${month}.${year} ${hours}:${minutes}`;

  await pool.query(
    `INSERT INTO date_of_completion(date_of_completion) VALUES('${date}')`
  );

  let tools = await axios({
    method: 'get',
    url: 'http://127.0.0.1:5501/getTools',
  });
  tools = tools.data;

  for (let i = 0; i < tools.length; i++) {
    console.log(tools[i]);
    const result = await axios({
      method: 'get',
      url: `https://api.hh.ru/vacancies?text=${encodeURIComponent(
        tools[i].name_tools
      )}&area=1&no_magic=true&page=0&per_page=0`,
    });
    pool.query(
      `INSERT INTO count_in_hh(
        id_tools,
        date_of_completion,
        id_count_in_indeed)
        VALUES(
        ${tools[i].id_tools},
        (SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1),
        ${result.data.found})`
    );
  }

  let countOfError = 0;

  async function getCount(tool) {
    if (countOfError > 10)
      return pool.query(
        `INSERT INTO count_in_indeed(
        id_tools,
        date_of_completion,
        id_count_in_indeed)
        VALUES(
        ${tool.id_tools},
        (SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1),
        0)`
      );
    try {
      const encodeString = encodeURIComponent(tool.name_tools);
      const url =
        encodeString === tool.name_tools
          ? `https://www.indeed.com/q-${tool.name_tools}-jobs.html`
          : `https://www.indeed.com/jobs?q=${encodeString}&vj&vjk`;

      let resp = await needle('get', url);

      let indexFirstDigit = resp.body.indexOf('Page 1 of ') + 10;
      if (indexFirstDigit === 9) {
        countOfError++;
        return getCount(tool);
      }
      let number = resp.body.slice(indexFirstDigit, indexFirstDigit + 10);
      let result = '';
      for (const char of number) {
        if (char === ' ') {
          await console.log(tool.name_tools, result);
          return pool.query(
            `INSERT INTO count_in_indeed(
            id_tools,
            date_of_completion,
            id_count_in_indeed)
            VALUES(
            ${tool.id_tools},
            (SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1),
            ${result})`
          );
        }
        if (char === ',') continue;
        result += char;
      }
    } catch (error) {
      console.log('Произошла ошибка');
      console.log(error);
      return getCount(tool);
    }
  }

  for (let i = 0; i < tools.length; i++) {
    countOfError = 0;
    await getCount(tools[i]);
  }
  console.log(`Потрачено минут: ${((new Date() - start) / 60000).toFixed(2)}`);
}

app.get('/uploadDataToTheDatabase', (req, res) => uploadDataToTheDatabase());

app.listen(5501, () => {
  console.log('SERVER WORKING!');
});
