const express = require('express');
const needle = require('needle');
const cors = require('cors');
const Pool = require('pg').Pool;
const axios = require('axios');
const app = express();
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'vacna',
  password: 'zxczxc2013',
  port: 5432,
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

app.get('/getHhru', async (req, res) => {
  const result = [];
  const start = new Date();
  for (let i = 0; i < tools.length; i++) {
    const b = await axios({
      method: 'get',
      url: `https://api.hh.ru/vacancies?text=${encodeURIComponent(
        tools[i]
      )}&area=1&no_magic=true&page=0&per_page=0`,
    });
    result.push(`${b.data.found}\n`);
  }
  const end = new Date();
  console.log((end - start) / 1000);
  console.log(result.join(''));
});

app.get('/getIndeed', async (req, res) => {
  let countOfError = 0;

  async function getCount(tool) {
    if (countOfError > 10) return [tool, 0];

    try {
      const encodeString = encodeURIComponent(tool);
      const url =
        encodeString === tool
          ? `https://www.indeed.com/q-${tool}-jobs.html`
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
          await console.log(tool, 'found');
          return [tool, result];
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
  const result = [];
  const start = new Date();

  for (let i = 0; i < tools.length; i++) {
    countOfError = 0;
    result.push(await getCount(tools[i]));
  }

  res.send(result);
  console.log(`Потрачено минут: ${((new Date() - start) / 60000).toFixed(2)}`);
});

async function uploadDataToTheDatabase() {
  let tools;

  await pool.query(
    'INSERT INTO date_of_completion(date_of_completion) VALUES(now())'
  );

  tools = await axios({
    method: 'get',
    url: 'http://127.0.0.1:5501/getTools',
  });
  tools = tools.data;

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
          await console.log(tool.name_tools, 'res:', result);
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

  const start = new Date();
  for (let i = 0; i < tools.length / 25; i++) {
    countOfError = 0;
    await getCount(tools[i]);
  }
  console.log(`Потрачено минут: ${((new Date() - start) / 60000).toFixed(2)}`);
}

app.get('/uploadDataToTheDatabase', (req, res) => uploadDataToTheDatabase());

app.listen(5501, () => {
  console.log('SERVER WORKING!');
});
