import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { Events, GatewayIntentBits, TextChannel } from "discord.js";
import { env } from "./env";
import { Embed, Field } from "./lib/jsx/Embed";
import { createElement } from "./lib/jsx";
import { BotClient } from "./lib/client";
import type { Context } from "./context";

const path = dirname(fileURLToPath(import.meta.url));
const bot = new BotClient<Context>({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
  commandsPath: join(path, "commands"),
  createContext: async (bot) => ({
    logsChannel: (await bot.channels.fetch(env.LOGS_CHANNEL)) as TextChannel,
  }),
});

bot.on(Events.MessageDelete, async (message) => {
  if (message.partial) await message.fetch();
  console.log(message.content);

  if (message.channel) {
    message.channel.send({
      embeds: [
        <Embed title="test">
          {message.content || "nothing here"}
          <Field
            name="test"
            value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
          />
        </Embed>,
      ],
    });
  }
});

bot.login(env.TOKEN);
