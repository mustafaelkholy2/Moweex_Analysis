import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "product_role_enum" AS ENUM('available', 'unavailable')
        `);

        await queryRunner.query(`
            CREATE TABLE "product" (
                "id" SERIAL NOT NULL, 
                "productName" VARCHAR(50) NOT NULL,
                "price" VARCHAR(50) NOT NULL,
                "role" "product_role_enum" NOT NULL DEFAULT 'available', 
                "description" VARCHAR(255) NOT NULL,
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE product
        `);
        await queryRunner.query(`
            DROP TYPE "product_role_enum"
        `);
    }

}
