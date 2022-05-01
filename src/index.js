import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { on } from "node:events";

const users = [];

const app = createServer((req, res) => {
  if (req.method == "GET" && req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/json" });
    res.end(JSON.stringify(users));
  }
  if (req.method == "POST" && req.url == "/") {
    req.on("data", async (d) => {
      const data = await JSON.parse(d);
      const user = {
        id: randomUUID(),
        name: data.name,
        email: data.email,
      };

      users.push(user);
      console.log(user);
    });
    res.writeHead(201, { "Content-Type": "text/json" });
    res.end();
  }
});

async function bootstrap() {
  app.listen(process.env.PORT || 3333, function () {
    console.log("server started");
  });
}
bootstrap();
