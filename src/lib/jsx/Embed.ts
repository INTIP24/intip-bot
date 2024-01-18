import {
  EmbedBuilder,
  type APIEmbed,
  type APIEmbedField,
  type APIEmbedFooter,
  type EmbedFooterOptions,
  type EmbedAuthorOptions,
} from "discord.js";
import { string } from "zod";

type EmbedProps = Omit<
  APIEmbed,
  "author" | "fields" | "description" | "footer"
>;

export function Embed({ children, ...other }: EmbedProps) {
  const builder = new EmbedBuilder(other);

  for (const item of children) {
    if (typeof item === "string") {
      builder.setDescription(item);
    }

    if (typeof item !== "object") {
      throw new Error("Not an embed component");
    }

    switch (item.type) {
      case "author":
        builder.setAuthor(item);
        break;
      case "field":
        builder.addFields(item);
        break;
      case "footer":
        builder.setFooter(item);
        break;
      default:
        throw new Error("Not an embed component");
    }
  }

  return builder;
}

export function Author(props: EmbedAuthorOptions) {
  return props;
}

export function Field(props: APIEmbedField) {
  return props;
}

export function Footer(props: EmbedFooterOptions) {
  return props;
}
