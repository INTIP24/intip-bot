import {
  Client,
  Events,
  type ClientOptions,
  Collection,
  type Interaction,
  type CacheType,
} from "discord.js";
import type { Command } from "./commands";
import { commandLoader } from "./loaders";

type BotClientOptions = {
  commandsPath: string;
} & ClientOptions;

export class BotClient extends Client {
  public commands = new Collection<string, Command>();
  private commandsPath: string;
  private initialized = false;

  constructor(options: BotClientOptions) {
    super(options);

    this.commandsPath = options.commandsPath;

    this.on(Events.InteractionCreate, this.commandInteractionHandler);
  }

  private async commandInteractionHandler(interaction: Interaction<CacheType>) {
    if (!interaction.isCommand()) return;

    const command = this.commands.get(interaction.commandName);

    if (!command) {
      throw new Error(`Command ${interaction.commandName} was not found`);
    }

    const process = command.handler(interaction);

    await process(interaction);
  }

  async init() {
    if (this.initialized) return;

    await commandLoader(this.commands, this.commandsPath);

    this.initialized = true;
  }

  public override async login(token: string): Promise<string> {
    if (!this.initialized) {
      await this.init();
    }

    return super.login(token);
  }
}
