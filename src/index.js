import {Readable,Writable} from 'node:stream'
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import {faker} from "@faker-js/faker"
const users = [];

function * generatorUser(maxUsers=100){
   for(let i=0;i<maxUsers;i++){
           const user={
             id:randomUUID(),
             name:faker.name.firstName('female'),
             address:faker.address.city(),
           }
           yield user;
   }
}

const app = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/json" });
    res.end(JSON.stringify(users));
  }
  if (req.method === "POST" && req.url === "/") {
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
  if(req.method==="GET"&&req.url==='/dados'){
      new Readable(
        {
          read(){
            for(const data of generatorUser()){
              this.push(JSON.stringify(data));
              console.log(data);
            }
            this.push(null)
          }
        }
      ).pipe(
        res
      )    
  }
});

async function bootstrap() {
  app.listen(process.env.PORT || 3333, function () {
    console.log("server started");
  });
}
bootstrap();
