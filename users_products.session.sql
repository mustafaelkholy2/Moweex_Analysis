CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    userName varchar(30),
    mail varchar(40),
    password varchar(20),
    is_Admin boolean
);
CREATE TABLE products(
    product_id BIGSERIAL PRIMARY KEY,
    product_name varchar(30),
    price BIGINT,
    is_available boolean
);