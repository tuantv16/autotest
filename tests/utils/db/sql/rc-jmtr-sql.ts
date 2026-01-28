/**
 * SQL helpers for RC_JMTR table.
 */

/**
 * Build DELETE SQL for RC_JMTR by伝票番号
 *
 * @param jznuridenNo 伝票番号 (JMTR_JZNURIDEN_NO)
 */
export function buildDeleteRcJmtrSql(
  jznuridenNo: string
): string {
  return `
DELETE FROM RC_JMTR
WHERE JMTR_JZNURIDEN_NO = '${jznuridenNo}'
`;
}


