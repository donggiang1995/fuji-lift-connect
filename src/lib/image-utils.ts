/**
 * Utility functions for handling image URLs
 */

/**
 * Check if URL is a valid direct image URL
 */
export const isDirectImageUrl = (url: string): boolean => {
  if (!url) return false;
  
  // Check for common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
  const lowercaseUrl = url.toLowerCase();
  
  // Check if URL ends with image extension or contains image extension before query params
  return imageExtensions.some(ext => 
    lowercaseUrl.includes(ext) || 
    lowercaseUrl.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?|$)/i)
  );
};

/**
 * Convert ibb.co share URLs to direct image URLs
 * ibb.co share URLs like https://ibb.co/9msj2f73 need to be converted to
 * https://i.ibb.co/9msj2f73/image.jpg
 * 
 * However, ibb.co doesn't provide a direct API for this conversion,
 * so we return null to indicate the URL cannot be used directly
 */
export const convertIbbUrl = (url: string): string | null => {
  if (!url) return null;
  
  // If it's already a direct ibb.co image URL
  if (url.includes('i.ibb.co')) {
    return url;
  }
  
  // ibb.co share URLs cannot be directly converted without scraping
  // Return null to indicate this URL won't work as an image source
  if (url.includes('ibb.co/')) {
    return null;
  }
  
  return url;
};

/**
 * Get a valid image URL or return null if invalid
 * This handles various image hosting services
 */
export const getValidImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  // Handle ibb.co URLs
  if (url.includes('ibb.co')) {
    return convertIbbUrl(url);
  }
  
  // Handle Supabase storage URLs - these are always valid
  if (url.includes('supabase.co/storage')) {
    return url;
  }
  
  // Handle direct image URLs
  if (isDirectImageUrl(url)) {
    return url;
  }
  
  // For other URLs, assume they might work
  return url;
};

/**
 * Get placeholder image URL
 */
export const getPlaceholderImage = (): string => {
  return '/placeholder.svg';
};
