import boto3
import json
import mysql.connector

def lambda_handler(event, context):
    """
    Creates a new quiz object in documentDB and RDS
    """

    user_id, quiz_data = event["userId"], event["quiz"],
    name = quiz_data["name"]

    # Db connection
    db = mysql.connector.connect(
        host="sd1e7h3lcrgky97.ctnnda3nrolp.us-east-1.rds.amazonaws.com",
        user="admin",
        password="password1",
        database="software_quiz",
    )

    # Setup cursor
    cursor = db.cursor()

    # Generate UUID
    cursor.execute("SELECT UUID()")
    uuid = cursor.fetchone()[0]

    #Insert values
    try:
        cursor.execute("INSERT INTO Quiz (id, user_id, name) VALUES (%s, %s, %s)", (uuid, user_id, name))
        db.commit()
        success = True
    except:
        success = False

    # Close connections
    cursor.close()
    db.close()

    # Upload quiz document to s3
    s3_client = boto3.client('s3')
    s3_client.put_object(Body=json.dumps(quiz_data), Bucket="software-programming-quiz-document-bucket", Key=uuid)

    return {"success": success}


if __name__ == "__main__":

    event = {}

    lambda_handler(event, {})