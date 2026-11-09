import { ProjectMedia } from "@/types/project";

export function getProjectCoverMediaIndex(media: ProjectMedia[] | undefined): number {
  if (!media?.length) return -1;

  for (let index = media.length - 1; index >= 0; index -= 1) {
    if (media[index].isCover && media[index].type === "image") return index;
  }

  return media.findIndex((item) => item.type === "image");
}
