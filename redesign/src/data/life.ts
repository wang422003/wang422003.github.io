export interface LifeEntry {
  id: string;
  title: string;
  date: string;
  image?: string;
  alt?: string;
  location?: string;
  note?: string;
}

// Add your own photos under public/images/life/ and reference them here.
// Keep this empty until there are real photographs or personal notes to share.
export const lifeEntries: LifeEntry[] = [];
