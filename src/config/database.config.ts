import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export default () => ({
    database: {
        type: 'postgres',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User, Product],
        synchronize: false,
        migrations: [__dirname + '/../migrations-dir/*.ts'],
        migrationsRun: true,
        logging: true,
    }
})