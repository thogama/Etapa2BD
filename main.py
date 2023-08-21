import psycopg2

class DatabaseManager:
    def __init__(self, host, port, database, user, password):
        self.conn = psycopg2.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()

    def insert_data(self, table, data):
        try:
            query = f"INSERT INTO {table} (nome, idade, curso) VALUES (%s, %s, %s)"
            self.cursor.execute(query, data)
            self.conn.commit()
            print("Inserção bem-sucedida!")
        except Exception as e:
            print(f"Erro ao inserir dados: {e}")

    def query_data(self, table):
        try:
            query = f"SELECT * FROM {table}"
            self.cursor.execute(query)
            result = self.cursor.fetchall()
            print(f"Resultados da consulta em {table}:")
            for row in result:
                print(row)
        except Exception as e:
            print(f"Erro ao consultar dados: {e}")

    def close_connection(self):
        self.cursor.close()
        self.conn.close()

if __name__ == "__main__":
    db = DatabaseManager(
        host="bd-aulas.cfnpx3uennk6.us-east-1.rds.amazonaws.com",
        port=5432,
        database="etapa1",
        user="postgres",
        password="postgres"
    )

    dados_insercao1 = ("Gabriel Bispo", 21, "Engenharia de Alimentos")
    dados_insercao2 = ("Alan Gama", 21, "Engenharia de Pesca")

    db.insert_data("aluno", dados_insercao1)
    db.insert_data("aluno", dados_insercao2)

    db.close_connection()
