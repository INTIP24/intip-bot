import {
  SlashCommandStringOption,
  type APIApplicationCommandOptionChoice,
  SlashCommandIntegerOption,
  SlashCommandBooleanOption,
} from "discord.js";
import { state } from "./state";
import { data } from "./data";

type BaseOptions = {
  descriptionLocalizations?: Record<string, string>;
  nameLocalizations?: Record<string, string>;
  required?: boolean;
};

type StringOptions = BaseOptions & {
  choices?: APIApplicationCommandOptionChoice<string>[];
  autocomplete?: () => Promise<string[]>;
  maxLength?: number;
  minLength?: number;
};

type IntegerOptions = BaseOptions & {
  choices?: APIApplicationCommandOptionChoice<number>[];
  autocomplete?: () => Promise<number[]>;
};

export function useString(
  name: string,
  description: string,
  options: StringOptions,
) {
  if (!data.options) {
    const stringOption = new SlashCommandStringOption()
      .setName(name)
      .setDescription(description);

    if (options.required) {
      stringOption.setRequired(options.required);
    }

    if (options.choices) {
      for (const choice of options.choices) {
        stringOption.addChoices(choice);
      }
    }

    if (options.autocomplete) {
      stringOption.setAutocomplete(true);
    }

    if (options.minLength) {
      stringOption.setMinLength(options.minLength);
    }

    if (options.maxLength) {
      stringOption.setMaxLength(options.maxLength);
    }

    if (options.nameLocalizations) {
      for (const locale in options.nameLocalizations) {
        stringOption.setNameLocalization(
          locale as any,
          options.nameLocalizations[locale]!,
        );
      }
    }

    if (options.descriptionLocalizations) {
      for (const locale in options.descriptionLocalizations) {
        stringOption.setDescriptionLocalization(
          locale as any,
          options.descriptionLocalizations[locale]!,
        );
      }
    }

    state.options.push(stringOption);

    return null;
  }

  return data.options.getString(name, options.required);
}

export function useInteger(
  name: string,
  description: string,
  options: IntegerOptions,
) {
  if (!data.options) {
    const integerOption = new SlashCommandIntegerOption()
      .setName(name)
      .setDescription(description);

    if (options.required) {
      integerOption.setRequired(options.required);
    }

    if (options.choices) {
      for (const choice of options.choices) {
        integerOption.addChoices(choice);
      }
    }

    if (options.autocomplete) {
      integerOption.setAutocomplete(true);
    }

    if (options.nameLocalizations) {
      for (const locale in options.nameLocalizations) {
        integerOption.setNameLocalization(
          locale as any,
          options.nameLocalizations[locale]!,
        );
      }
    }

    if (options.descriptionLocalizations) {
      for (const locale in options.descriptionLocalizations) {
        integerOption.setDescriptionLocalization(
          locale as any,
          options.descriptionLocalizations[locale]!,
        );
      }
    }

    state.options.push(integerOption);

    return null;
  }

  return data.options.getInteger(name, options.required);
}

export function useBoolean(
  name: string,
  description: string,
  options: BaseOptions,
) {
  if (!data.options) {
    const booleanOption = new SlashCommandBooleanOption()
      .setName(name)
      .setDescription(description);

    if (options.required) {
      booleanOption.setRequired(options.required);
    }

    if (options.nameLocalizations) {
      for (const locale in options.nameLocalizations) {
        booleanOption.setNameLocalization(
          locale as any,
          options.nameLocalizations[locale]!,
        );
      }
    }

    if (options.descriptionLocalizations) {
      for (const locale in options.descriptionLocalizations) {
        booleanOption.setDescriptionLocalization(
          locale as any,
          options.descriptionLocalizations[locale]!,
        );
      }
    }

    state.options.push(booleanOption);

    return null;
  }

  return data.options.getBoolean(name, options.required);
}

export function useUser(
  name: string,
  description: string,
  options: StringOptions,
) {
  // TODO: Implement remaining hooks
  throw new Error("Unimplemented");

  const stringOption = new SlashCommandStringOption()
    .setName(name)
    .setDescription(description);

  if (options.choices) {
    for (const choice of options.choices) {
      stringOption.addChoices(choice);
    }
  }

  if (options.autocomplete) {
    stringOption.setAutocomplete(true);
  }

  if (options.minLength) {
    stringOption.setMinLength(options.minLength);
  }

  if (options.maxLength) {
    stringOption.setMaxLength(options.maxLength);
  }

  state.options.push(stringOption);
}

export function useChannel(
  name: string,
  description: string,
  options: StringOptions,
) {
  // TODO: Implement remaining hooks
  throw new Error("Unimplemented");

  const stringOption = new SlashCommandStringOption()
    .setName(name)
    .setDescription(description);

  if (options.choices) {
    for (const choice of options.choices) {
      stringOption.addChoices(choice);
    }
  }

  if (options.autocomplete) {
    stringOption.setAutocomplete(true);
  }

  if (options.minLength) {
    stringOption.setMinLength(options.minLength);
  }

  if (options.maxLength) {
    stringOption.setMaxLength(options.maxLength);
  }

  state.options.push(stringOption);
}

export function useRole(
  name: string,
  description: string,
  options: StringOptions,
) {
  // TODO: Implement remaining hooks
  throw new Error("Unimplemented");

  const stringOption = new SlashCommandStringOption()
    .setName(name)
    .setDescription(description);

  if (options.choices) {
    for (const choice of options.choices) {
      stringOption.addChoices(choice);
    }
  }

  if (options.autocomplete) {
    stringOption.setAutocomplete(true);
  }

  if (options.minLength) {
    stringOption.setMinLength(options.minLength);
  }

  if (options.maxLength) {
    stringOption.setMaxLength(options.maxLength);
  }

  state.options.push(stringOption);
}

export function useMentionable(
  name: string,
  description: string,
  options: StringOptions,
) {
  // TODO: Implement remaining hooks
  throw new Error("Unimplemented");

  const stringOption = new SlashCommandStringOption()
    .setName(name)
    .setDescription(description);

  if (options.choices) {
    for (const choice of options.choices) {
      stringOption.addChoices(choice);
    }
  }

  if (options.autocomplete) {
    stringOption.setAutocomplete(true);
  }

  if (options.minLength) {
    stringOption.setMinLength(options.minLength);
  }

  if (options.maxLength) {
    stringOption.setMaxLength(options.maxLength);
  }

  state.options.push(stringOption);
}

export function useNumber(
  name: string,
  description: string,
  options: StringOptions,
) {
  // TODO: Implement remaining hooks
  throw new Error("Unimplemented");

  const stringOption = new SlashCommandStringOption()
    .setName(name)
    .setDescription(description);

  if (options.choices) {
    for (const choice of options.choices) {
      stringOption.addChoices(choice);
    }
  }

  if (options.autocomplete) {
    stringOption.setAutocomplete(true);
  }

  if (options.minLength) {
    stringOption.setMinLength(options.minLength);
  }

  if (options.maxLength) {
    stringOption.setMaxLength(options.maxLength);
  }

  state.options.push(stringOption);
}

export function useAttachment(
  name: string,
  description: string,
  options: StringOptions,
) {
  // TODO: Implement remaining hooks
  throw new Error("Unimplemented");

  const stringOption = new SlashCommandStringOption()
    .setName(name)
    .setDescription(description);

  if (options.choices) {
    for (const choice of options.choices) {
      stringOption.addChoices(choice);
    }
  }

  if (options.autocomplete) {
    stringOption.setAutocomplete(true);
  }

  if (options.minLength) {
    stringOption.setMinLength(options.minLength);
  }

  if (options.maxLength) {
    stringOption.setMaxLength(options.maxLength);
  }

  state.options.push(stringOption);
}
