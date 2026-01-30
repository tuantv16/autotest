import { executeOracleNonQuery } from '../oracle-db';
import { buildDeleteRcJmtrSql } from './sql/rc-jmtr-sql';

/**
 * Delete test record from RC_JMTR table on real Oracle DB.
 * Connection info is taken from environment variables in `oracle-db.ts`.
 */
export async function deleteRcJmtrTestRecord(
  jznuridenNo: string
): Promise<void> {
  const deleteSql = buildDeleteRcJmtrSql(jznuridenNo);
  await executeOracleNonQuery(deleteSql);
}
