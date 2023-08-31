import { MigrationInterface, QueryRunner } from "typeorm";

export class IntialMigrations1693412602345 implements MigrationInterface {
    name = 'IntialMigrations1693412602345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog\` DROP COLUMN \`updatedAt\``);
    }

}
