import json
import mysql.connector


def lambda_handler(event, context):
    """
    Creates a quiz invite with provided details from event
    """
    # Get user properties from event
    quizId, userId, email = event["quizId"], event["userId"], event["email"],

    # Setup db and cursor
    db = mysql.connector.connect(
        host="sd1e7h3lcrgky97.ctnnda3nrolp.us-east-1.rds.amazonaws.com",
        user="admin",
        password="password1",
        database="software_quiz"
    )
    cursor = db.cursor()

    # Insert data
    try:
        cursor.execute("INSERT INTO Invite ( quiz_id, user_id, email) VALUES ( %s, %s, %s)", (quizId, userId, email))
        db.commit()
        success = True

    except:
        success = False

    # Close connections
    cursor.close()
    db.close()

    return {"success": success}


if __name__ == "__main__":

    event = {
        "quizId": "123",
        "userId": "abc",
        "email": "email@email.com"
    }

    lambda_handler(event, {})