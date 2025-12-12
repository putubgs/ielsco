// Basic slug converter
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // replace spaces → hyphens
    .replace(/[^\w-]+/g, "");    // remove non-url-friendly chars
}

// Generate a unique slug (frontend-safe version)
export function generateSlug(text: string, existingSlugs: string[] = []) {
  let baseSlug = slugify(text);
  let slug = baseSlug;
  let counter = 2;

  // If slug already exists → append -2, -3, etc.
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}