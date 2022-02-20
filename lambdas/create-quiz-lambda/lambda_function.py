#import boto3
import json
import mysql.connector

def lambda_handler(event, context):
    """
    Creates a new quiz object in documentDB and RDS
    """

    # Db connection
    db = mysql.connector.connect(
        host="sd1e7h3lcrgky97.ctnnda3nrolp.us-east-1.rds.amazonaws.com",
        user="admin",
        password="password1",
        database="software_quiz",
    )

    # Setup cursor
    cursor = db.cursor()

    cursor.execute("SELECT UUID()")
    uuid = cursor[0]
    cursor.execute("INSERT INTO Quiz (id, user_id) VALUES (%s, %s)", (uuid, "1234567",))

    # Save data and close connections
    db.commit()
    cursor.close()
    db.close()


    # Upload document to s3

    #s3_client = boto3.client('s3')

    # file = json.dumps(quiz)

    # response = s3_client.upload_file(file_name, bucket, object_name)


    return



if __name__ == "__main__":

    event = {}

    lambda_handler(event, {})