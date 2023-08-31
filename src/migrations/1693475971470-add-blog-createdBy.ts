import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogCreatedBy1693475971470 implements MigrationInterface {
    name = 'AddBlogCreatedBy1693475971470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog\` ADD \`createdBy\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog\` DROP COLUMN \`createdBy\``);
    }

}
