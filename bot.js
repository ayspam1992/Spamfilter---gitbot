const Discord = require("discord.js");
const keepAlive = require("./server")
const config = require("./config.json");
let cld = new Discord.Collection();
let wb = config.webhook.split(["/"]);
config.webhookID = wb[5];
config.webhookToken = wb[6];

const client = new Discord.Client();
client.on("ready", async () => {
  console.log("Bot Hazır: " + client.user.tag);
});
client.on("message", async (msg) => {
  if (msg.channel.id != config.channel) return;
  let id = msg.content.match(/🆔 ?[0-9]*/gi)[0];
  if (!id) return;

  if (cld.get(id)) return msg.react("❌");

  msg.react("✅");
  let now = new Date().getTime();
  const webhookClient = new Discord.WebhookClient(
    config.webhookID,
    config.webhookToken
  );
  let content = msg.content;
  webhookClient.send(`@everyone\n${content}`);
  cld.set(id, now);
  setTimeout(() => {
    cld.delete(id);
  }, 86400000);
});

keepAlive()
client.login(config.token);
