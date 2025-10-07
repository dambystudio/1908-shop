// Instagram configuration utilities

/**
 * Get Instagram username from environment variables
 * Falls back to hardcoded default if not set
 */
export function getInstagramUsername(): string {
  return process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || '1908shop_'
}

/**
 * Get Instagram profile URL
 */
export function getInstagramProfileUrl(): string {
  return `https://www.instagram.com/${getInstagramUsername()}/`
}

/**
 * Get Instagram direct message URL (note: this may not work on all platforms)
 * @deprecated Use copy + open profile approach instead
 */
export function getInstagramDMUrl(message?: string): string {
  const username = getInstagramUsername()
  if (message) {
    return `https://ig.me/m/${username}?text=${encodeURIComponent(message)}`
  }
  return `https://ig.me/m/${username}`
}
