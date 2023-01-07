import { MigrationInterface, QueryRunner } from "typeorm";

export class initialSchema1673071222331 implements MigrationInterface {
    name = 'initialSchema1673071222331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Userslist" ALTER COLUMN "date" SET DEFAULT '11:30:30 am'`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "date" SET DEFAULT '"2023-01-07T06:00:30.864Z"'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "date" SET DEFAULT '"2023-01-07T06:00:30.865Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "date" SET DEFAULT '2023-01-07 05:05:59.975'`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "date" SET DEFAULT '2023-01-07 05:05:59.974'`);
        await queryRunner.query(`ALTER TABLE "Userslist" ALTER COLUMN "date" SET DEFAULT '10:35:59 am'`);
    }

}
