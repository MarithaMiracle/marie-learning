import { sql } from "drizzle-orm";
import { weekCatalogue } from "@/lib/catalogue";
import { jsonValue, withActor } from "@/lib/db/client";

export type CatalogueWeek = {
  week: number;
  title: string;
  description: string;
  lessons: number;
};

/**
 * Published curriculum for the marketing pages. Falls back to the written
 * catalogue when the database is unavailable, so the pages always render.
 */
export async function getPublicCatalogue(): Promise<CatalogueWeek[]> {
  try {
    const live = await withActor(null, async (tx) => {
      const result = await tx.execute(sql`select public_catalogue() as catalogue`);
      return jsonValue<CatalogueWeek[]>(result) ?? [];
    });
    if (live.length) return live;
  } catch {
    // The written catalogue below is the fallback when the database is unavailable.
  }
  return weekCatalogue.map(([title, description], index) => ({
    week: index + 1,
    title,
    description,
    lessons: 2,
  }));
}
