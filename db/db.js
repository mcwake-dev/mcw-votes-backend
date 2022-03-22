const asyncRedis = require("async-redis");
let client;

switch(process.env.NODE_ENV) {
  case "test-remote":
    client = asyncRedis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    });
    break;
  case "production":
    client = asyncRedis.createClient({
      redis_url: REDISCLOUD_URL
    });
    break;
  default: 
    client = asyncRedis.createClient();
    break;
}

client.on("error", (err) => {
  console.log("Error " + err);
});

module.exports = client;
