import type {
  CacheType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  RESTPostAPIContextMenuApplicationCommandsJSONBody,
  Interaction,
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  ContextMenuCommandType,
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
  interaction?: Interaction<CacheType>,
) => (interaction: Interaction<CacheType>) => Promise<void>;
export type ContextMenuCommandHandler = (
  interaction?: any,
) => (interaction: Interaction<CacheType>) => Promise<void>;
export type CommandHandler = SlashCommandHandler | ContextMenuCommandHandler;

export type CommandData =
  | RESTPostAPIChatInputApplicationCommandsJSONBody
  | RESTPostAPIContextMenuApplicationCommandsJSONBody;

export type Command = {
  data: CommandData;
  handler: CommandHandler;
};

export function slashCommand(handler: SlashCommandHandler): Command {
  resetGlobalHookState();

  handler();

  const data = gatherSlashCommandData();

  return {
    data,
    handler: (interaction: ChatInputCommandInteraction<CacheType>) => {
      resetGlobalHookState();

      setupSlashCommandHooks(interaction);

      return handler();
    },
  };
}
export function contextMenuCommand(
  menuType: ContextMenuCommandType,
  handler: ContextMenuCommandHandler,
): Command {
  resetGlobalHookState();

  state.menuType = menuType;

  handler();

  const data = gatherContextMenuCommandData();

  return {
    data,
    handler: (interaction: ContextMenuCommandInteraction<CacheType>) => {
      resetGlobalHookState();

      setupContextMenuCommandHooks(interaction);

      return handler();
    },
  };
}
