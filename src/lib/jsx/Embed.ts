import {
  EmbedBuilder,
  type APIEmbed,
  type APIEmbedField,
  type EmbedFooterOptions,
  type EmbedAuthorOptions,
} from "discord.js";

type EmbedChild = AuthorProps | FieldProps | FooterProps;

type EmbedProps = Omit<
  APIEmbed,
  "author" | "fields" | "description" | "footer"
> & { children: string | EmbedChild[] };

export function Embed({ children, ...other }: EmbedProps) {
  const builder = new EmbedBuilder(other);

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

type AuthorProps = EmbedAuthorOptions & { type: "author" };

export function Author(props: AuthorProps) {
  return { ...props, type: "author" };
}

type FieldProps = APIEmbedField & { type: "field" };

export function Field(props: FieldProps) {
  return { ...props, type: "field" };
}

type FooterProps = EmbedFooterOptions & { type: "footer" };

export function Footer(props: FooterProps) {
  return { ...props, type: "footer" };
}
