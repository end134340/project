require('dotenv').config({path : './database/dbConfig.env'});
const express = require("express");
const app = express();
const port = 3000;

console.log(process.env.DB_NAME);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/hello", (req, res) => {
  console.log(req.url);
  res.send("Hello World!");
});

//api붙이는 이유: api로 찾아와서.
app.get("/api/board", (req, res) => {
  res.send({ title: "노드 api 서버 update!!!!" });
});

// vue.js build 이후

//public폴더 아래의 정적 파일들 서버에 인식시킴.
const path = require('path');
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

//sendfile=> 절대 경로를 이용해 접근했을 때 파일을 전송. 파일을 읽어들여 그걸 res에 전송할 수 있도록 처리.
app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./public", "index.html"));
});
