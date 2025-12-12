// Convert text into a clean URL-friendly slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // replace spaces → hyphens
    .replace(/[^\w-]+/g, "");    // remove non-url-friendly chars
}

// Generate a unique slug based on existing slugs
export function generateSlug(text: string, existingSlugs: string[] = []): string {
  const baseSlug = slugify(text);  // <-- now const (ESLint happy)
  let slug = baseSlug;
  let counter = 2;

  // If slug already exists, append -2, -3, -4...
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}