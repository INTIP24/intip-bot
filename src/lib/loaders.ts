import { join } from "node:path";
import { readdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { Collection } from "discord.js";
import type { Command } from "lib/commands";

export const allowedFiletypes = ["js", "ts", "tsx"];

export async function loadFolder<T>(
  collection: Collection<string, T>,
  path: string,
): Promise<void> {
  const files = await readdir(path);

  for (const file of files) {
    const fileExtension = file.split(".").at(-1)!;
    if (!allowedFiletypes.includes(fileExtension)) continue;

    const filePath = join(path, file);
    const fileImport = await import(pathToFileURL(filePath).toString());
    const item = fileImport.default as T;

    const fileWithoutExtension = file.split(".").slice(0, -1).join(".");
    collection.set(fileWithoutExtension, item);
  }
}

export async function commandLoader(
  collection: Collection<string, Command>,
  path: string,
) {
  return loadFolder(collection, path);
}
