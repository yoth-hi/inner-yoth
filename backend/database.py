import os
import psycopg2
from functools import lru_cache

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
def createConn():
  return psycopg2.connect(
    dbname=dbname,
    user=user,
    password=password,
    host=host,
    port=port
  )

def SQL(sqlCode, arguments=None, isReturn=0):
    try:
        records = None
        print(arguments)
        conn = createConn()
        # Conectando ao banco de dados

        # Criando um cursor para executar comandos SQL
        cursor = conn.cursor()

        # Executando o comando SQL com os argumentos
        cursor.execute(sqlCode, arguments)

        # Obtendo os resultados se for uma consulta SELECT
        if isReturn == 0:
            records = cursor.fetchall()
        elif isReturn == 1:
            # Confirmando a transação se não for uma consulta SELECT
            conn.commit()
            records = None
        else:
            records = []
            for i in range(isReturn):
              records.append(cursor.fetchone())
              print(records)
              if isReturn > i:
                cursor.nextset()
            conn.commit()
        # Fechando o cursor e a conexão
        cursor.close()
        conn.close()

        return records

    except Exception as e:
        print(f"An error occurred: {e}")
        return None
@lru_cache(maxsize=128)
def SQLC(sqlCode, arguments=None, isReturn=0):
  return SQL(sqlCode, arguments, isReturn)

