/**
 * Converts bytes to a human-readable file size string
 * @param bytes - The size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Human-readable size string (e.g., "1.5 MB", "500 KB", "1.23 GB")
 */
export const formatSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Ensure the index doesn't exceed our sizes array
  if (i >= sizes.length) {
    return (bytes / Math.pow(k, sizes.length - 1)).toFixed(decimals) + " " + sizes[sizes.length - 1];
  }

  return (bytes / Math.pow(k, i)).toFixed(decimals) + " " + sizes[i];
};


export const generateUUID=()=>crypto.randomUUID();
