/**
 * Date utility functions
 */


/**
 * Convert YYYYMMDD to YYYY/MM/DD
 * @param dateStr Date string in YYYYMMDD format
 * @returns Date string in YYYY/MM/DD format, or original string if invalid
 */
export const toDate = (dateStr: string): string => {
  if (!dateStr || dateStr.length !== 8) return dateStr
  return `${dateStr.substring(0, 4)}/${dateStr.substring(4, 6)}/${dateStr.substring(6, 8)}`
}