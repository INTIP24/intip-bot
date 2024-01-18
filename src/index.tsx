import { Client, Events, GatewayIntentBits } from "discord.js";
import { env } from "./env";
import { Embed, Field } from "./lib/jsx/Embed";
import { createElement } from "./lib/jsx";

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

bot.once(Events.ClientReady, (client) => {
  console.log("Ready!");

  client.on(Events.MessageDelete, async (message) => {
    if (message.partial) await message.fetch();
    console.log(message.content);

    if (message.channel) {
      message.channel.send({
        embeds: [
          <Embed title="test">
            {message.content}
            <Field name="test" value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
          </Embed>
        ]
      })
    }
  });
});

bot.login(env.TOKEN);
