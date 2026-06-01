/**
 * Shared category URL helpers.
 * URL format: shop/:gender/:categoryName/:categoryId
 * e.g.  shop/kadin/ayakkabi/2
 *       shop/erkek/gomlek/11
 */

const CHAR_MAP = {
  ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i',
  ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u',
};

export function toSlug(str = '') {
  return str
    .split('')
    .map((c) => CHAR_MAP[c] ?? c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Resolve gender string to URL segment.
 * API may return "k" / "e" or "kadin" / "erkek" (case-insensitive).
 */
export function genderSlug(raw = '') {
  const v = String(raw).toLowerCase().trim();
  if (v === 'k' || v.startsWith('kad')) return 'kadin';
  if (v === 'e' || v.startsWith('erk')) return 'erkek';
  return v || 'all';
}

/** Display label for gender segment */
export function genderLabel(raw = '') {
  const s = genderSlug(raw);
  if (s === 'kadin') return 'Kadın';
  if (s === 'erkek') return 'Erkek';
  return 'Diğer';
}

/**
 * Build the full category link URL from a category object.
 * category: { id, title|name, gender, ... }
 */
export function buildCategoryUrl(category) {
  const gender   = genderSlug(category.gender);
  const rawName  = category.title ?? category.name ?? '';
  // Strip leading "Kadın " / "Erkek " if present before slugifying
  const cleanName = rawName.replace(/^(kadin|kadın|erkek)\s*/i, '').trim();
  const slug     = toSlug(cleanName || rawName);
  return `/shop/${gender}/${slug}/${category.id}`;
}
