import {
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  type RESTPostAPIContextMenuApplicationCommandsJSONBody,
  type ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  type CommandInteraction,
  type ContextMenuCommandType,
} from "discord.js";
import {
  gatherContextMenuCommandData,
  gatherSlashCommandData,
  resetGlobalHookState,
  state,
} from "./hooks/state";
import {
  setupContextMenuCommandHooks,
  setupSlashCommandHooks,
} from "./hooks/data";

export type SlashCommandHandler<TContext> = (
  interaction: ChatInputCommandInteraction,
  ctx: TContext
) => Promise<any>;
export type ContextMenuCommandHandler<TContext> = (
  interaction: ContextMenuCommandInteraction,
  ctx: TContext
) => Promise<any>;

export type CommandHandler<TContext> = (
  interaction: CommandInteraction,
  ctx: TContext
) => Promise<any>;

export type WrappedCommandHandler<TContext> = (
  interaction: CommandInteraction
) => (interaction: CommandInteraction, ctx: TContext) => Promise<any>;

export type CommandData =
  | RESTPostAPIChatInputApplicationCommandsJSONBody
  | RESTPostAPIContextMenuApplicationCommandsJSONBody;

export type Command<TContext = {}> = {
  data: CommandData;
  handler: WrappedCommandHandler<TContext>;
};

export function slashCommand<TContext>(
  handler: () => SlashCommandHandler<TContext>
): Command<TContext> {
  resetGlobalHookState();

  handler();

  const data = gatherSlashCommandData();

  return {
    data,
    handler: (interaction) => {
      if (!interaction.isChatInputCommand()) {
        throw new Error(`Wrong command type (slash) running for ${data.name}!`);
      }

      resetGlobalHookState();

      setupSlashCommandHooks(interaction as ChatInputCommandInteraction);

      return handler() as CommandHandler<TContext>;
    },
  };
}
export function contextMenuCommand<TContext>(
  menuType: ContextMenuCommandType,
  handler: () => ContextMenuCommandHandler<TContext>
): Command<TContext> {
  resetGlobalHookState();

  state.menuType = menuType;

  handler();

  const data = gatherContextMenuCommandData();

  return {
    data,
    handler: (interaction) => {
      if (!interaction.isContextMenuCommand()) {
        throw new Error(
          `Wrong command type (context) running for ${data.name}!`
        );
      }

      resetGlobalHookState();

      setupContextMenuCommandHooks(
        interaction as ContextMenuCommandInteraction
      );

      return handler() as CommandHandler<TContext>;
    },
  };
}
