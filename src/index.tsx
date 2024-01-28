import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { Events, GatewayIntentBits } from "discord.js";
import { env } from "./env";
import { Embed, Field } from "./lib/jsx/Embed";
import { createElement } from "./lib/jsx";
import { BotClient } from "./lib/client";

const path = dirname(fileURLToPath(import.meta.url));
const bot = new BotClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
  commandsPath: join(path, "commands"),
});

bot.once(Events.ClientReady, () => {
  console.log("Ready!");
});

bot.on(Events.MessageDelete, async (message) => {
  if (message.partial) await message.fetch();
  console.log(message.content);

  if (message.channel) {
    message.channel.send({
      embeds: [
        <Embed title="test">
          {message.content}
          <Field
            name="test"
            value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
          />
        </Embed>,
      ],
    });
  }
});

bot.on(Events.InteractionCreate, async (interaction) => {
  interaction;
});

bot.login(env.TOKEN);
