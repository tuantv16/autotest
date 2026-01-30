/**
 * Simple Oracle DB helper for tests.
 *
 * Connection information is taken from environment variables:
 * - ORACLE_USER            (default: 'C##POS_RENEWAL')
 * - ORACLE_PASSWORD        (default: 'VTI@1234')
 * - ORACLE_CONNECT_STRING  (default: '10.1.13.187:1521/POS')
 *
 * NOTE:
 * - Requires `oracledb` package to be installed in the project:
 *     npm install oracledb --save-dev
 */

declare function require(name: string): any;

const oracledb = require('oracledb') as any;

export interface OracleConnectionConfig {
  user: string;
  password: string;
  connectString: string;
}

export function getDefaultOracleConfig(): OracleConnectionConfig {
  return {
    user: process.env.ORACLE_USER || 'C##POS_RENEWAL',
    password: process.env.ORACLE_PASSWORD || 'VTI@1234',
    connectString: process.env.ORACLE_CONNECT_STRING || '10.1.13.187:1521/POS',
  };
}

/**
 * Execute a non-query SQL (e.g., DELETE / UPDATE) against Oracle DB.
 */
export async function executeOracleNonQuery(
  sql: string,
  config: OracleConnectionConfig = getDefaultOracleConfig()
): Promise<void> {
  let connection: any;

  try {
    connection = await oracledb.getConnection(config);
    await connection.execute(sql);
    await connection.commit();
    console.log('[TEST] executeOracleNonQuery - executed successfully.');
  } catch (error) {
    console.error('[TEST] executeOracleNonQuery - failed.', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch {
        // ignore
      }
    }
  }
}


