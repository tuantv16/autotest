import { executeOracleNonQuery } from '../oracle-db';
import { buildDeleteRcJurzSql } from './sql/rc-jurz-sql';

/**
 * Delete test record from RC_JMTR table on real Oracle DB.
 * Connection info is taken from environment variables in `oracle-db.ts`.
 */
export async function deleteRcJurzTestRecord(
  jznuridenNo: string
): Promise<void> {
  const deleteSql = buildDeleteRcJurzSql(jznuridenNo);
  await executeOracleNonQuery(deleteSql);
}
