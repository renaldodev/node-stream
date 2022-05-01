import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { on } from "node:events";

const users = new Set();

const app = createServer((req, res) => {
  if (req.method == "GET" && req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/json" });
    res.end(JSON.parse(users));
  }
  if (req.method == "POST" && req.url == "/") {
    on("data", (data) => {
      const user = {
        id: randomUUID(),
        name: data.name,
        email: data.email,
      };
      users.add(user);
      console.log(user);
    });
    const user = JSON.parse(body);
    users.add(user);
    res.end(
      JSON.stringify({
        id: user.id,
        name: user.name,
      })
    );
  }
});

async function bootstrap() {
  app.listen(process.env.PORT || 3333, function () {
    console.log("server started");
  });
}
bootstrap();
console.log(workdir);
