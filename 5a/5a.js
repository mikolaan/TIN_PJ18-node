// a)	Prosty serwer HTTP przyjmujący żądania wykonania różnych operacji matematycznych (add, sub, mul, div) pod różnymi url, wyciągający parametry z parametrów żądania (mogą być np. w ścieżce) i zwracający wynik w formie odpowiedzi html zawierającej parametry żądania i wynik. Formatowanie zależy od Ciebie. Pamiętaj o obsłudze błędnych/brakujących parametrów. Ściąga z modułu http pod: https://nodejs.org/api/http.html

"use strict";
const http = require("http");
const url = require("url");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  let params = /^\/(add|sub|mul|div)\/(\d+)\/(\d+)$/.exec(req.url);

  if (!!params) {
    let [_, method, first, second] = params;
    let [a, b] = [Number(first), Number(second)];

    let calc;
    switch (method) {
      case "add":
        calc = `${a} + ${b} = ${a + b}`;
        break;
      case "sub":
        calc = `${a} - ${b} = ${a - b}`;
        break;
      case "mul":
        calc = `${a} * ${b} = ${a * b}`;
        break;
      case "div":
        calc = `${a} / ${b} = ${a / b}`;
        break;
      default:
        calc =
          "Submitted method seem to be invalid, please select either: add, sub, mul or div in order to perform operation.";
    }
    res.write(calc);
  } else {
    res.write(
      'Not valid URL. Specify method and two parameters like "add/1/2", "sub/12/5", "mul/3/4" or "div/4/2".'
    );
  }
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
