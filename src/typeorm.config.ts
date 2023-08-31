import { DataSource } from 'typeorm';
import { configDotenv } from 'dotenv'
import { Console } from 'console';
configDotenv()
console.log([__dirname + '/**/*.entity{.ts,.js}'])
export default new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ["dist/migrations/*{.ts,.js}"],
  synchronize: false,
  logger: "debug"
});