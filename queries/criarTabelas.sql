-- Criação da tabela banco
CREATE TABLE banco (
    id serial PRIMARY KEY,
    nome VARCHAR(255) UNIQUE,
    caixa FLOAT
);

-- Criação da tabela cliente
CREATE TABLE cliente (
    id serial PRIMARY KEY,
    nome VARCHAR(255),
    cpf VARCHAR UNIQUE
);

-- Criação da tabela conta
CREATE TABLE conta (
    cliente_id INT,
    banco_id INT,
    id serial PRIMARY KEY,
    saldo FLOAT,
    FOREIGN KEY (cliente_id) REFERENCES cliente (id),
    FOREIGN KEY (banco_id) REFERENCES banco (id),
    CONSTRAINT unique_cliente_banco UNIQUE (cliente_id, banco_id)
);
