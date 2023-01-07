import { MigrationInterface, QueryRunner } from "typeorm";

export class initialSchema1673067956369 implements MigrationInterface {
    name = 'initialSchema1673067956369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Userslist" ALTER COLUMN "date" SET DEFAULT '10:35:59 am'`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "date" SET DEFAULT '"2023-01-07T05:05:59.974Z"'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "date" SET DEFAULT '"2023-01-07T05:05:59.975Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "date" SET DEFAULT '2023-01-06 09:36:00.978'`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "date" SET DEFAULT '2023-01-06 09:36:00.978'`);
        await queryRunner.query(`ALTER TABLE "Userslist" ALTER COLUMN "date" SET DEFAULT '3:06:00 pm'`);
    }

}
