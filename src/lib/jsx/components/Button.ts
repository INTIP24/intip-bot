import { ButtonBuilder, ButtonStyle } from "discord.js";

type ButtonBaseProps = {
  disabled?: boolean;
  children: string | string[];
  emoji?: string;
};

type ActionButtonProps = ButtonBaseProps & {
  action: string;
  style?: ButtonStyle;
};
type URLButtonProps = ButtonBaseProps & {
  url: string;
};

type ButtonProps = ActionButtonProps | URLButtonProps;

export function Button({ children, ...props }: ButtonProps) {
  const button = new ButtonBuilder();

  if ("action" in props) {
    button.setCustomId(props.action);
    if (props.style) {
      button.setStyle(props.style);
    }
  } else {
    button.setURL(props.url);
    button.setStyle(ButtonStyle.Link);
  }

  button.setLabel((children as string[]).join(""));

  if (props.disabled) {
    button.setDisabled(true);
  }

  if (props.emoji) {
    button.setEmoji(props.emoji);
  }

  return button;
}
