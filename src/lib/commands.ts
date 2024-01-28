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

export type SlashCommandHandler = (
  interaction: ChatInputCommandInteraction,
) => Promise<any>;
export type ContextMenuCommandHandler = (
  interaction: ContextMenuCommandInteraction,
) => Promise<any>;

export type CommandHandler = (interaction: CommandInteraction) => Promise<any>;

export type WrappedCommandHandler = (
  interaction: CommandInteraction,
) => (interaction: CommandInteraction) => Promise<any>;

export type CommandData =
  | RESTPostAPIChatInputApplicationCommandsJSONBody
  | RESTPostAPIContextMenuApplicationCommandsJSONBody;

export type Command = {
  data: CommandData;
  handler: WrappedCommandHandler;
};

export function slashCommand(handler: () => SlashCommandHandler): Command {
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

      return handler() as CommandHandler;
    },
  };
}
export function contextMenuCommand(
  menuType: ContextMenuCommandType,
  handler: () => ContextMenuCommandHandler,
): Command {
  resetGlobalHookState();

  state.menuType = menuType;

  handler();

  const data = gatherContextMenuCommandData();

  return {
    data,
    handler: (interaction) => {
      if (!interaction.isContextMenuCommand()) {
        throw new Error(
          `Wrong command type (context) running for ${data.name}!`,
        );
      }

      resetGlobalHookState();

      setupContextMenuCommandHooks(
        interaction as ContextMenuCommandInteraction,
      );

      return handler() as CommandHandler;
    },
  };
}
