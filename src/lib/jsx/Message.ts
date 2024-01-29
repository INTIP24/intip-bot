import {
  EmbedBuilder,
  ActionRowBuilder,
  type InteractionReplyOptions,
} from "discord.js";

class Content {
  public type = "message-content";
  public content: string;

  constructor(content: string[]) {
    this.content = content.join("");
  }
}

export function MessageContent({ children }: { children: string[] }): Content {
  return new Content(children);
}

type MessageChild = Content | EmbedBuilder | ActionRowBuilder;

type MessageProps = {
  ephemeral?: boolean;
  children: MessageChild[];
};

export function Message({
  ephemeral,
  children,
}: MessageProps): InteractionReplyOptions {
  const msg: InteractionReplyOptions = {};

  msg.ephemeral = ephemeral;

  for (const child of children) {
    if (child instanceof EmbedBuilder) {
      if (!msg.embeds) {
        msg.embeds = [];
      }

      msg.embeds.push(child.toJSON());
    } else if (child instanceof ActionRowBuilder) {
      if (!msg.components) {
        msg.components = [];
      }

      msg.components.push(child as any);
    } else if (child instanceof Content) {
      if (msg.content) {
        throw new Error("More than one MessageContent on a message found!");
      }
      msg.content = child.content;
    }
  }

  return msg;
}
