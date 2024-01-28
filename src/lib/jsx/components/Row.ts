import { ActionRowBuilder, type ButtonBuilder } from "discord.js";

export function Row({
  children,
}: {
  children: ButtonBuilder[];
}): ActionRowBuilder {
  return new ActionRowBuilder().addComponents(...children);
}
