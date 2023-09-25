-- Consulta usando LIKE
SELECT * FROM cliente WHERE nome LIKE 'Jo%';

-- Consulta usando operadores de conjuntos
SELECT * FROM cliente WHERE id IN (1, 2, 3);

-- Consulta usando um JOIN
SELECT c.nome, b.nome AS nome_banco
FROM cliente c
JOIN conta co ON c.id = co.cliente_id
JOIN banco b ON co.banco_id = b.id;

-- Consulta usando mais de um JOIN
SELECT c.nome AS nome_cliente, b.nome AS nome_banco
FROM cliente c
JOIN conta co ON c.id = co.cliente_id
JOIN banco b ON co.banco_id = b.id
WHERE b.caixa > 100000;

-- Consulta usando OUTER JOIN
SELECT c.nome, co.saldo
FROM cliente c
LEFT JOIN conta co ON c.id = co.cliente_id;

-- Consulta usando função de agregação (Exemplo de soma do saldo das contas por cliente)
SELECT c.nome, SUM(co.saldo) AS total_saldo
FROM cliente c
JOIN conta co ON c.id = co.cliente_id
GROUP BY c.nome;

-- Consulta usando GROUP BY e HAVING (Exemplo de clientes com saldo total superior a 1000)
SELECT c.nome, SUM(co.saldo) AS total_saldo
FROM cliente c
JOIN conta co ON c.id = co.cliente_id
GROUP BY c.nome
HAVING SUM(co.saldo) > 1000;

-- Consulta usando operador IN
SELECT * FROM banco WHERE id IN (1, 2);

-- Consulta usando operador EXISTS (Exemplo de clientes que têm contas)
SELECT * FROM cliente c
WHERE EXISTS (SELECT 1 FROM conta co WHERE c.id = co.cliente_id);

-- Consulta usando operador SOME (Exemplo de clientes com saldo maior que algum valor específico)
SELECT * FROM cliente c
WHERE 1000 < SOME (SELECT co.saldo FROM conta co WHERE c.id = co.cliente_id);

-- Consulta usando operador ALL (Exemplo de clientes com saldo maior que todos os valores específicos)
SELECT * FROM cliente c
WHERE 1000 > ALL (SELECT co.saldo FROM conta co WHERE c.id = co.cliente_id);

-- Consulta aninhada no FROM (Exemplo de subconsulta no FROM)
SELECT c.nome, subquery.total_saldo
FROM cliente c
JOIN (SELECT cliente_id, SUM(saldo) AS total_saldo FROM conta GROUP BY cliente_id) AS subquery
ON c.id = subquery.cliente_id;
