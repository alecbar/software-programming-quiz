import boto3
import json
import mysql.connector


def lambda_handler(event, context):
    """
    Creates a quiz invite with provided details from event
    """
    #return "TEST"
    # Get user properties from event
    quizId, email = event["quizId"], event["email"],

    mydb = mysql.connector.connect(
        host="sd1e7h3lcrgky97.ctnnda3nrolp.us-east-1.rds.amazonaws.com",
        user="admin",
        password="password1",
        database="Software_Quiz"
    )

    mycursor = mydb.cursor()
    sql = "INSERT INTO Quiz_Invite (email, quiz_id) VALUES (%s, %s)"
    val = (email, quizId)
    mycursor.execute(sql, val)
    mydb.commit()

    # find all quizzes based on the email
    sql = "select * from Quiz_Invite where email = %s"
    val = (email)
    mycursor.execute(sql, val)

    # get all records in the quiz_invite table that has the same email entered
    rows = mycursor.fetchall()

    return json.dump(rows)
