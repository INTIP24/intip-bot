import type {
  CacheType,
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  Interaction,
} from "discord.js";

type Data = {
  options?: ChatInputCommandInteraction<CacheType>["options"];
};

function defaultData(): Data {
  return {};
}

export let data = defaultData();

export function setupSlashCommandHooks(
  interaction: ChatInputCommandInteraction<CacheType>,
) {
  data = defaultData();

  data.options = interaction.options;
}
export function setupContextMenuCommandHooks(
  interaction: ContextMenuCommandInteraction<CacheType>,
) {
  data = defaultData();
}
