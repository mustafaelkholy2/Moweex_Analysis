import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM('admin', 'user')
        `);

        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL, 
                "userName" varchar(50) NOT NULL, 
                "email" varchar(50) NOT NULL, 
                "password" varchar(255) NOT NULL, 
                "role" "user_role_enum" NOT NULL DEFAULT 'user', 
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE user
        `);
        await queryRunner.query(`
            DROP TYPE "user_role_enum"
        `);
    }

}
