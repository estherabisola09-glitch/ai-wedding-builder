import type { WeddingPuckData } from "../puck/types";
import { createManorHeirloomPreset } from "./presets/manorHeirloom";

export interface TemplatePresetOptions {
  coupleNames?: string;
  weddingDate?: string;
  venue?: string;
  city?: string;
  story?: string;
}

export type PresetFactory = (options?: TemplatePresetOptions) => WeddingPuckData;

/**
 * Registry mapping template IDs to their Puck preset generators.
 */
export const templatePresetRegistry: Record<string, PresetFactory> = {
  "manor-heirloom": createManorHeirloomPreset,
  "the-manor-heirloom": createManorHeirloomPreset,
};

/**
 * Retrieves a seeded Puck Data preset for a given template ID.
 * Falls back to Manor Heirloom if the specific template preset has not yet been built.
 */
export function getTemplatePreset(
  templateId: string,
  options: TemplatePresetOptions = {}
): WeddingPuckData {
  const normalizedId = (templateId || "").toLowerCase().trim().replace(/\s+/g, "-");
  const factory = templatePresetRegistry[normalizedId];

  if (factory) {
    return factory(options);
  }

  // Graceful fallback for all 32 templates until their individual presets are implemented
  return createManorHeirloomPreset(options);
}

export default templatePresetRegistry;

