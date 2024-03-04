import {
  EmbedBuilder,
  type APIEmbed,
  type APIEmbedField,
  type EmbedFooterOptions,
  type EmbedAuthorOptions,
} from "discord.js";

type EmbedChild = string | AuthorComponent | FieldComponent | FooterComponent;

type EmbedProps = Omit<
  APIEmbed,
  "author" | "fields" | "description" | "footer"
> & { children: EmbedChild | EmbedChild[] };

export function Embed({ children, ...other }: EmbedProps) {
  const builder = new EmbedBuilder(other);

  if (!Array.isArray(children)) children = [children];

  for (const item of children) {
    if (typeof item === "string") {
      builder.setDescription(item);
      continue;
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

type AuthorComponent = EmbedAuthorOptions & { type: "author" };

export function Author(props: EmbedAuthorOptions) {
  return { ...props, type: "author" };
}

type FieldComponent = APIEmbedField & { type: "field" };

export function Field(props: APIEmbedField) {
  return { ...props, type: "field" };
}

type FooterComponent = EmbedFooterOptions & { type: "footer" };

export function Footer(props: EmbedFooterOptions) {
  return { ...props, type: "footer" };
}
