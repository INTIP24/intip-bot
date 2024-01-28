import { ButtonBuilder, type ButtonStyle } from "discord.js";

type ButtonBaseProps = {
  disabled?: boolean;
  children: string;
  emoji?: string;
  style?: ButtonStyle;
};

type ActionButtonProps = ButtonBaseProps & {
  action: string;
};
type URLButtonProps = ButtonBaseProps & {
  url: string;
};

type ButtonProps = ActionButtonProps | URLButtonProps;

export function Button(props: ButtonProps) {
  const button = new ButtonBuilder();

  if ("action" in props) {
    button.setCustomId(props.action);
  } else {
    button.setURL(props.url);
  }

  button.setLabel(props.children);

  if (props.style) {
    button.setStyle(props.style);
  }

  if (props.disabled) {
    button.setDisabled(true);
  }

  if (props.emoji) {
    button.setEmoji(props.emoji);
  }

  return button;
}
