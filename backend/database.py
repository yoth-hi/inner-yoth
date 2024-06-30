import os
import psycopg2
import urllib.parse as urlparse

def get_database_url():
    # Obtendo a URL do banco de dados da variável de ambiente
    db_url = os.getenv('POSTGRES_URL')

    if db_url is None:
        raise EnvironmentError("POSTGRES_URL not found in environment variables.")

    return db_url

# URL de conexão PostgreSQL
db_url = get_database_url()

# Analisando a URL de conexão
url = urlparse.urlparse(db_url)
dbname = url.path[1:]
user = url.username
password = url.password
host = url.hostname
port = url.port

def SQL(sqlCode, arguments=None):
    try:
        # Conectando ao banco de dados
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )

        # Criando um cursor para executar comandos SQL
        cursor = conn.cursor()

        # Executando o comando SQL com os argumentos
        cursor.execute(sqlCode, arguments)

        # Obtendo os resultados se for uma consulta SELECT
        if sqlCode.strip().upper().startswith('SELECT'):
            records = cursor.fetchall()
        else:
            # Confirmando a transação se não for uma consulta SELECT
            conn.commit()
            records = None

        # Fechando o cursor e a conexão
        cursor.close()
        conn.close()

        return records

    except Exception as e:
        print(f"An error occurred: {e}")
        return None

