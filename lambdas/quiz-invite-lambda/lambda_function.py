import boto3
import json
import mysql.connector


def lambda_handler(event, context):
    """
    Creates a quiz invite with provided details from event
    """
    # Get user properties from event
    userId, quizId, email = event["userId"], event["quizId"], event["email"],

    mydb = mysql.connector.connect(
        host="sd1e7h3lcrgky97.ctnnda3nrolp.us-east-1.rds.amazonaws.com",
        user="admin",
        password="password1",
        database="Software_Quiz"
    )

    mycursor = mydb.cursor()

    sql = "INSERT INTO Quiz_Invite ( quiz_id, email) VALUES ( %s, %s)"
    val = (quizId, email)
    mycursor.execute(sql, val)
    #mycursor.execute("INSERT INTO Quiz_Invite ( quiz_id, email) VALUES ( '123', 'test@gmail.com')")

    mydb.commit()

    # Setup cognito client
    # client = boto3.client('cognito-idp')

    return mycursor.rowcount

