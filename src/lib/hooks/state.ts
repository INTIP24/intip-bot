import {
  ApplicationCommandOptionBase,
  ApplicationCommandOptionType,
  type ContextMenuCommandType,
  ContextMenuCommandBuilder,
  SlashCommandAttachmentOption,
  SlashCommandBooleanOption,
  SlashCommandBuilder,
  SlashCommandChannelOption,
  SlashCommandIntegerOption,
  SlashCommandMentionableOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption,
  SlashCommandStringOption,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  SlashCommandUserOption,
} from "discord.js";

type State<
  T extends ApplicationCommandOptionBase = ApplicationCommandOptionBase,
> = {
  options: T[];
  subcommands: SlashCommandSubcommandBuilder[];
  subcommandGroups: SlashCommandSubcommandGroupBuilder[];
  defaultMemberPermissions?: string | number;
  description?: string;
  descriptionLocalizations: Record<string, string>;
  dmEnabled: boolean;
  name?: string;
  nameLocalizations: Record<string, string>;
  menuType?: ContextMenuCommandType;
};

function defaultHookState(): State {
  return {
    options: [],
    subcommands: [],
    subcommandGroups: [],
    descriptionLocalizations: {},
    dmEnabled: true,
    nameLocalizations: {},
  };
}

export let state = defaultHookState();

export function resetGlobalHookState() {
  state = defaultHookState();
}

export function gatherSlashCommandData() {
  const command = new SlashCommandBuilder();

  for (const option of state.options) {
    switch (option.type) {
      case ApplicationCommandOptionType.String:
        command.addStringOption(option as SlashCommandStringOption);
        break;
      case ApplicationCommandOptionType.Integer:
        command.addIntegerOption(option as SlashCommandIntegerOption);
        break;
      case ApplicationCommandOptionType.Boolean:
        command.addBooleanOption(option as SlashCommandBooleanOption);
        break;
      case ApplicationCommandOptionType.User:
        command.addUserOption(option as SlashCommandUserOption);
        break;
      case ApplicationCommandOptionType.Channel:
        command.addChannelOption(option as SlashCommandChannelOption);
        break;
      case ApplicationCommandOptionType.Role:
        command.addRoleOption(option as SlashCommandRoleOption);
        break;
      case ApplicationCommandOptionType.Mentionable:
        command.addMentionableOption(option as SlashCommandMentionableOption);
        break;
      case ApplicationCommandOptionType.Number:
        command.addNumberOption(option as SlashCommandNumberOption);
        break;
      case ApplicationCommandOptionType.Attachment:
        command.addAttachmentOption(option as SlashCommandAttachmentOption);
        break;
      default:
        throw new Error("Invalid command option type");
    }
  }

  for (const subcommand of state.subcommands) {
    command.addSubcommand(subcommand);
  }

  for (const subcommandGroup of state.subcommandGroups) {
    command.addSubcommandGroup(subcommandGroup);
  }

  if (state.defaultMemberPermissions) {
    command.setDefaultMemberPermissions(state.defaultMemberPermissions);
  }

  if (state.description) {
    command.setDescription(state.description);
  }

  for (const locale in state.descriptionLocalizations) {
    command.setDescriptionLocalization(
      locale as any,
      state.descriptionLocalizations[locale]!,
    );
  }

  command.setDMPermission(state.dmEnabled);

  if (state.name) {
    command.setName(state.name);
  }

  for (const locale in state.nameLocalizations) {
    command.setNameLocalization(
      locale as any,
      state.nameLocalizations[locale]!,
    );
  }

  return command.toJSON();
}

export function gatherContextMenuCommandData() {
  const command = new ContextMenuCommandBuilder();

  if (!state.name) {
    throw new Error("No name provided for command");
  }

  command.setName(state.name);

  for (const locale in state.nameLocalizations) {
    command.setNameLocalization(
      locale as any,
      state.nameLocalizations[locale]!,
    );
  }

  if (!state.menuType) {
    throw new Error("No type provided for context menu");
  }

  command.setType(state.menuType);

  command.setDMPermission(state.dmEnabled);

  if (state.defaultMemberPermissions) {
    command.setDefaultMemberPermissions(state.defaultMemberPermissions);
  }

  return command.toJSON();
}
