-- Criação da tabela banco
CREATE TABLE banco (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    caixa DECIMAL(10, 2) NOT NULL
);

-- Criação da tabela cliente
CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL
);

-- Criação da tabela conta
CREATE TABLE conta (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    banco_id INT NOT NULL,
    saldo DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (banco_id) REFERENCES banco(id)
);
