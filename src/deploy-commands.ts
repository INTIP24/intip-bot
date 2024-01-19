import { join } from "node:path";
import { argv } from "node:process";
import { REST, Routes } from "discord.js";
import { env } from "./env";
import type { CommandData } from "./lib/commands";
import { BotClient } from "lib/client";

async function main() {
  console.log(argv.slice(2));

  const client = new BotClient({
    commandsPath: join(import.meta.dirname, "commands"),
    intents: [],
  });

  await client.init();

  const commandData: CommandData[] = [];

  for (const command of client.commands.values()) {
    commandData.push(command.data);
  }

  const rest = new REST().setToken(env.TOKEN);

  const data: any = await rest.put(Routes.applicationCommands(env.CLIENT_ID), {
    body: commandData,
  });

  console.log(`Successfully deployed ${data.length} commands.`);
}

main().catch(console.error);
