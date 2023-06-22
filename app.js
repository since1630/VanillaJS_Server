const http = require("http");
const port = process.env.PORT || 3000;
const fs = require("fs").promises;
const path = require("path");

const users = {};
const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      if (req.url === "/") {
        const data = await fs.readFile(
          path.join(`${__dirname}/`, "/index.html")
        );
        // 응답은 반드시 보내야함. 보내지 않으면 클라이언트는 응답을 계속 기다리다 Timeout(시간초과) 처리한다.
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); // 서버가 요청을 성공적으로 처리했음.
        return res.end(data);
      }
      //* 라우트 주소를 못 찾았을 경우 try/catch 에러 처리
      try {
        const data = await fs.readFile(path.join(__dirname, req.url));
        return res.end(data);
      } catch (err) {
        console.log(err, "해당 라우트를 못찾았음");
      }
    } else if (req.method == "POST") {
      if (req.url === "/user") {
        let body = "";
        // 요청의 body를 stream 형식으로 받음
        req.on("data", (data) => {
          body += data;
        });
        // console.log(body);
        // 요청의 body를 다 받은 후 실행됨
        return req.on("end", () => {
          const { userid } = JSON.parse(body);
          const id = Date.now();
          users[id] = userid;
          res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(JSON.stringify("등록 성공"));
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(err.message);
  }
});
server.listen(port, () => {
  console.log(`${port}에서 서버 열림`);
});

// server.on("error", (err) => {
//   console.log(err);
// });
