import json
import mysql.connector


def lambda_handler(event, context):
    """
    Get all quizzes from user
    """
    # Get user properties from event
    userId = event["userId"]

    # Setup db and cursor
    db = mysql.connector.connect(
        host="sd1e7h3lcrgky97.ctnnda3nrolp.us-east-1.rds.amazonaws.com",
        user="admin",
        password="password1",
        database="software_quiz"
    )
    cursor = db.cursor()

    quizzes = []

    # Select data
    try:
        cursor.execute("SELECT id, name FROM Quiz WHERE user_id = %s", (userId,))
        success = True

        for row in cursor.fetchall():
            quizzes.append({"id":  row[0], "name": row[1]})
    except:
        success = False

    # Close connections
    cursor.close()
    db.close()

    return {"success": success, "data": quizzes}


if __name__ == "__main__":

    event = {
        "userId": "b8ab4702-c36a-42e8-81ef-400299b2ed93",
    }

    lambda_handler(event, {})