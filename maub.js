let indeed;
async function getIndeed() {
  indeed = await axios({
    method: 'get',
    url: 'http://127.0.0.1:5501/getIndeed',
  });
  indeed = indeed.data;
  console.log(indeed.map((i) => i[1] + '\n').join(''));
}

async function hhru() {
  try {
    let d = await axios({
      method: 'get',
      url: 'http://127.0.0.1:5501/getHhru',
    });
  } catch (error) {
    document.location.href =
      error.response.data.errors[0].captcha_url +
      '&backurl=' +
      'http://127.0.0.1:5500/index.html';
  }

  console.log(d.data);
}

let tools;

async function getTools() {
  tools = await axios({
    method: 'get',
    url: 'http://127.0.0.1:5501/getTools',
  });
  tools = tools.data;
  tools = tools.map((el) => JSON.stringify(el));
  document.querySelector('.category').textContent = tools;
}
