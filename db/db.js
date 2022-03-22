const asyncRedis = require("async-redis");
const client = process.env.NODE_ENV === "test-remote" || 
               process.env.NODE_ENV === "production" ? 
                asyncRedis.createClient({
                  host: process.env.REDIS_HOST,
                  port: process.env.REDIS_PORT,
                  password: process.env.REDIS_PASSWORD
                }) : 
                asyncRedis.createClient();

client.on("error", (err) => {
  console.log("Error " + err);
});

module.exports = client;
