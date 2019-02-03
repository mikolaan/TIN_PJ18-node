"use strict";

const express = require("express");
const url = require("url");
const template = require("mustache");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

// a)	Obsłuży ścieżkę /hello zwracając “hello world”
app.get("/hello", (req, res) => res.send("hello world"));

// b)	Obsłuży ścieżkę /form zwracając formularz HTML z 3 polami, formularz powinien wysyłać dane pod /formdata
let destination = "/formdata";
app.get("/form", (req, res) =>
  res.send(`
<h2>HTML Form. Data will be displayed under http://localhost:3000/formdata URL</h2>
<form action=${destination}>
  <div>
    <label for="firstName">Enter your first name: </label>
    <input type='text' name='firstName'>
  </div>
  <div>
    <label for="lastName">Enter your last name: </label>
    <input type='text' name='lastName'>
  </div>
  <div>
    <label for="eMail">Enter your e-mail: </label>
    <input type='email' name='eMail'>
  </div>
  <input type='submit' value='Submit'>
</form>
`)
);

// c)	Obsłuży ścieżkę /formdata akceptując dane formularza i wyświetli je w cywilizowany sposób korzystając z wybranego engine szablonów
app.get(destination, (req, res) => {
  let parsedUrl = url.parse(req.url, true).query;
  console.log(parsedUrl);
  let result = template.render(
    `<h2> Data returned from HTML form: </h2>
    <p>First name: {{firstName}}</p>
    <p>Last name: {{lastName}}</p>
    <p>E-mail: {{eMail}}</p>`,
    parsedUrl
  );

  res.send(result);
});

// d)	Obsłuży ścieżkę /jsondata akceptując dane w formacie json (użyj np. curl by przetestować) i wyświetli je w cywilizowany sposób korzystając z wybranego engine szablonów. Struktura danych zależy od Ciebie, ale json powinien mieć przynajmniej 3 pola

//curl --header "Content-Type: application/json" --request POST --data '{"firstName":"Jan","lastName":"K.","eMail":"test@test.com"}'   http://localhost:3000/jsondata
app.post("/jsondata", (req, res) => {
  console.log(req);
  let result = template.render(
    `<p>First name: ${req.body.firstName}</p>
    <p>Last name: ${req.body.lastName}</p>
    <p>E-mail: ${req.body.eMail}</p>`,
    req.body
  );
  res.send(result);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
