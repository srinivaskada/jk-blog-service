import { MigrationInterface, QueryRunner } from "typeorm";

export class IntialMigrations1639412601344 implements MigrationInterface {
    name = 'IntialMigrations1639412601344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`blog\` (
          \`id\` int(11) NOT NULL AUTO_INCREMENT,
          \`title\` varchar(255) NOT NULL,
          \`description\` varchar(255) NOT NULL,
          \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`blog\``);
    }

}
