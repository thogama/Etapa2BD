-- Inserção de dados na tabela banco
INSERT INTO banco (nome, caixa) VALUES
    ('Banco A', 100000),
    ('Banco B', 150000),
    ('Banco C', 200000);

-- Inserção de dados na tabela cliente
INSERT INTO cliente (nome, cpf) VALUES
    ('João', '111.111.111-11'),
    ('Maria', '222.222.222-22'),
    ('Pedro', '333.333.333-33');

-- Inserção de dados na tabela conta
INSERT INTO conta (cliente_id, banco_id, saldo) VALUES
    (1, 1, 5000),
    (1, 2, 8000),
    (2, 2, 6000),
    (3, 3, 7500),
    (3, 1, 3000);
