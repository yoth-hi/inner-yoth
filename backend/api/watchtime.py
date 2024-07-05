import psycopg2
from urllib.parse import parse_qs
from psycopg2.extras import execute_batch

def Y(arr):
    if arr:
        return arr[0].split(",")
    return []

def WATCHTIME(context, self_, createConn):
    # Parse HTTP query parameters
    q = parse_qs(context["parsed_path"].query)
    video_id = q.get('vid', [])[0]
    startList = Y(q.get('st', []))
    endList = Y(q.get('ed', []))
    len_ = float(q.get('len', [0])[0])
    cmt = float(q.get('cmt', [0])[0])
    session = q.get('sid', [])[0]  # Assuming 'sid' is a single value
    lest_time = int((cmt / len_) * 100)
    
    # Verify if session is valid
    if not session:
        self_.send_error(403, "")
        return {}

    # Initialize variables
    used_seek = 0
    sql_queries = []

    # Prepare SQL queries for each watchtime entry
    for index in range(len(startList)):
        start = float(startList[index])
        end = float(endList[index])
        duration = end - start
        time_id = int((start / len_) * 100)

        # Construct SQL query for watchtime update or insert
        sql_query = """
        CALL update_watchtime(%s,%s,%s,%s,%s);
        """
        sql_queries.append((video_id, time_id, used_seek, start, end))

        # Set used_seek to 1 if there are multiple entries and it's not the first one
        if len(startList) > 1 and index > 0:
            used_seek = 1

    # Construct SQL query for updating/inserting viewers table
    sql_query_viewers = """
    DO $$
    DECLARE
        sid TEXT;
    BEGIN
        -- Attempt to update the viewers table
        UPDATE viewers
        SET lest_time = %s
        WHERE session = %s
          AND video_id = %s
        RETURNING session INTO sid;

        -- Check if the update affected any rows
        IF NOT FOUND THEN
            -- If no rows were updated, perform an insert
            INSERT INTO viewers (video_id, session, lest_time)
            VALUES (%s, %s, %s);
        END IF;
    END $$;
    """
    
    # Connect to the database and execute SQL queries
    conn = createConn()
    try:
        with conn.cursor() as cursor:
            # Execute viewers update/insert
            cursor.execute(sql_query_viewers, (lest_time, session, video_id, video_id, session, lest_time))
            # Execute batch of watchtime updates/inserts
            execute_batch(cursor, """
                CALL update_watchtime(%s, %s, %s, %s, %s);
            """, sql_queries)
        conn.commit()
    except psycopg2.Error as e:
        conn.rollback()
        # Handle the error, e.g., log it or send an appropriate HTTP response
        self_.send_error(500, str(e))
        return {}
    finally:
        conn.close()

    # Return success response
    return {
        "status": 204,
        "data": None
    }
