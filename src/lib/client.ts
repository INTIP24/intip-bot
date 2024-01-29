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

type CreateContext<TContext> = (
  bot: BotClient<TContext, true>,
) => Promise<TContext>;

type BotClientOptions<TContext> = {
  commandsPath: string;
  createContext?: CreateContext<TContext>;
} & ClientOptions;

export class BotClient<
  TContext,
  Ready extends boolean = boolean,
> extends Client<Ready> {
  public commands = new Collection<string, Command<TContext>>();
  public ctx?: TContext;
  private createContext: CreateContext<TContext>;
  private commandsPath: string;
  private initialized = false;

  constructor(options: BotClientOptions<TContext>) {
    super(options);

    this.commandsPath = options.commandsPath;
    this.createContext = options.createContext || ((() => ({})) as any);

    this.on(Events.InteractionCreate, this.commandInteractionHandler);
    this.once(Events.ClientReady, this.readyHandler as any);
  }

  private async readyHandler(client: BotClient<TContext, true>) {
    this.ctx = await this.createContext(client);
    console.log("Ready!");
  }

  private async commandInteractionHandler(interaction: Interaction<CacheType>) {
    if (!interaction.isCommand()) return;

    const command = this.commands.get(interaction.commandName);

    if (!command) {
      throw new Error(`Command ${interaction.commandName} was not found`);
    }

    const process = command.handler(interaction);

    const result = await process(interaction, this.ctx!);

    if (!result) return;

    interaction.reply(result);
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
