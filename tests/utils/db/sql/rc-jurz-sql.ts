/**
 * SQL helpers for RC_JURZ table.
 */

/**
 * Build DELETE SQL for RC_JURZ by伝票番号
 *
 * @param jznuridenNo 伝票番号 (JMTR_JZNURIDEN_NO)
 */
export function buildDeleteRcJurzSql(
    jznuridenNo: string,
  ): string {
    return `
  DELETE FROM RC_JURZ
  WHERE JURZ_JZNURIDEN_NO = '${jznuridenNo}'
  `;
  }
  
  
  