import { MigrationInterface, QueryRunner } from "typeorm";

export class initialSchema1673020226420 implements MigrationInterface {
    name = 'initialSchema1673020226420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Userslist" ALTER COLUMN "date" SET DEFAULT '9:20:40 pm'`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "date" SET DEFAULT '"2023-01-06T15:50:40.112Z"'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "date" SET DEFAULT '"2023-01-06T15:50:40.113Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "date" SET DEFAULT '2023-01-06 09:36:00.978'`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "date" SET DEFAULT '2023-01-06 09:36:00.978'`);
        await queryRunner.query(`ALTER TABLE "Userslist" ALTER COLUMN "date" SET DEFAULT '3:06:00 pm'`);
    }

}
