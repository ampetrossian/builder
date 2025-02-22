import type {
  Asset as DbAsset,
  File as DbFile,
} from "@webstudio-is/prisma-client";
import { type FontFormat, FONT_FORMATS } from "@webstudio-is/fonts";
import { FontMeta } from "@webstudio-is/fonts";
import { type Asset, ImageMeta } from "../schema";

// @todo remove once legacy fields are removed from schema
type DbAssetWithoutOldFields = Omit<
  DbAsset,
  "name" | "size" | "format" | "meta" | "status" | "description" | "createdAt"
>;

export const formatAsset = (
  asset: DbAssetWithoutOldFields,
  file: DbFile
): Asset => {
  const isFont = FONT_FORMATS.has(file.format as FontFormat);

  if (isFont) {
    return {
      id: asset.id,
      name: file.name,
      description: file.description,
      location: asset.location,
      projectId: asset.projectId,
      size: file.size,
      type: "font",
      createdAt: file.createdAt.toISOString(),
      format: file.format as FontFormat,
      meta: FontMeta.parse(JSON.parse(file.meta)),
    };
  }

  return {
    id: asset.id,
    name: file.name,
    description: file.description,
    location: asset.location,
    projectId: asset.projectId,
    size: file.size,
    type: "image",
    format: file.format,
    createdAt: file.createdAt.toISOString(),
    meta: ImageMeta.parse(JSON.parse(file.meta)),
  };
};
