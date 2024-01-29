import { data } from "./data";
import { state } from "./state";

export function useName(name: string) {
  if (!data.options) {
    state.name = name;
  }
}

export function useDescription(description: string) {
  if (!data.options) {
    state.description = description;
  }
}

export function useDMPermission(enabled: boolean) {
  if (!data.options) {
    state.dmEnabled = enabled;
  }
}

export function useDefaultPermissions(permissions: string | number) {
  if (!data.options) {
    state.defaultMemberPermissions = permissions;
  }
}

export function useNameLocalizations(localizations: Record<string, string>) {
  if (!data.options) {
    state.nameLocalizations = localizations;
  }
}

export function useDescriptionLocalizations(
  localizations: Record<string, string>,
) {
  if (!data.options) {
    state.descriptionLocalizations = localizations;
  }
}
