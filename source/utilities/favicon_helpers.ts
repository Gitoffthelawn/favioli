import { createFaviconURLFromChar, ICON_SIZE } from './create_favicon_url.ts';
import { isIconLink } from './predicates.ts';

const head = document.getElementsByTagName('head')[0];
let appendedFavicon: HTMLElement | null = null;

interface Options {
  shouldOverride?: boolean;
}

// Given an emoji string, append it to the document head
export async function appendFaviconLink(
  name: string,
  options?: Options | void,
) {
  const { shouldOverride = false } = options || {};
  const faviconURL = createFaviconURLFromChar(name || '');
  if (!faviconURL) return;

  if (appendedFavicon) {
    appendedFavicon.setAttribute('href', faviconURL);
  } else if (shouldOverride || !(await faviconIsAvailable())) {
    appendedFavicon = head.appendChild(
      createLink(faviconURL, ICON_SIZE, 'image/png'),
    );
  }
}

// Return an array of link tags that have an icon rel
export function getAllIconLinks(): HTMLLinkElement[] {
  return Array.prototype.slice
    .call(document.getElementsByTagName('link'))
    .filter(isIconLink);
}

export async function faviconIsAvailable() {
  const iconLinkFound = getAllIconLinks()
    .concat(createLink('/favicon.ico')) // Browsers fallback to favicon.ico
    .map(async ({ href }: HTMLLinkElement) => {
      if ((await fetch(href)).status < 400) return true;
      throw new Error('not found');
    });
  try {
    return await Promise.any(iconLinkFound);
  } catch {
    return false;
  }
}

// Removes all icon link tags
export function removeAllFaviconLinks(): void {
  getAllIconLinks().forEach((link) => link.remove());
  appendedFavicon = null;
}

// Given a url, create a favicon link
function createLink(
  href: string,
  size?: number,
  type?: string,
): HTMLLinkElement {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = href;
  if (type) link.type = type;
  if (size) link.setAttribute('sizes', `${size}x${size}`);
  return link;
}
