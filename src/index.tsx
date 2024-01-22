import { Client, Events, GatewayIntentBits, Partials, TextChannel } from "discord.js";
import { env } from "./env";
import { Author, Embed, Field, Footer } from "./lib/jsx/Embed";
import { createElement } from "./lib/jsx";

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages], partials: [Partials.Message] });

bot.once(Events.ClientReady, (client) => {
  console.log("Ready!");

  // Definitely not the right way for this! Buuuuut it works :)
  // TODO: Redo how this is handled LOL
  var logsChannel: TextChannel | null = null;
  client.channels.fetch(env.LOGS_CHANNEL)
    .then(channel => {
      logsChannel = channel as TextChannel;
    });

  client.on(Events.MessageDelete, async (message) => {
    if (message.partial) await message.fetch();
    if (!message.inGuild()) return;

    if (logsChannel != null) {
      logsChannel.send({
        embeds: [
          <Embed title="Message deleted" color={0xFF0000}>
            {`**Sent by <@!${message.author.id}> in <#${message.channel.id}>**\n${message.content}`}
            <Footer iconURL={message.author.avatarURL() || undefined} text={`Author: ${message.author.username} (${message.author.id})\nMessage ID: ${message.id}`} />
          </Embed>
        ]
      })
    }
  });

  client.on(Events.MessageUpdate, async (oldMessage, newMessage) => {
    if (oldMessage.partial) await oldMessage.fetch();
    if (newMessage.partial) await newMessage.fetch();

    if (!oldMessage.inGuild() || !newMessage.inGuild()) return;

    if (logsChannel != null) {
      logsChannel.send({
        embeds: [
          <Embed title="Message edited" color={0x3498EB}>
            {`**Sent by <@!${newMessage.author.id}> in <#${newMessage.channel.id}>**`}
            <Field name="Before" value={oldMessage.content} />
            <Field name="After" value={newMessage.content} />
            <Footer iconURL={newMessage.author.avatarURL() || undefined} text={`Author: ${newMessage.author.username} (${newMessage.author.id})\nMessage ID: ${newMessage.id}`} />
          </Embed>
        ]
      })
    }
  });
});

bot.login(env.TOKEN);
