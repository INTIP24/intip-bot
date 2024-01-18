import { Client, Events, GatewayIntentBits } from "discord.js";
import { env } from "./env";

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once(Events.ClientReady, () => {
  console.log("Ready!");
});

bot.login(env.TOKEN);
