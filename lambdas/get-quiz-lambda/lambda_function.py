import json
import boto3


def lambda_handler(event, context):
    """
    Get speciic quiz using id
    """
    # Get user properties from event
    quizId = event["quizId"]

    # Get quiz data
    s3 = boto3.resource("s3")
    obj = s3.Object("software-programming-quiz-document-bucket", quizId)

    data = obj.get()['Body'].read().decode('utf-8')

    return data

if __name__ == "__main__":

    event = {
        "quizId": "d3fd8e30-99e7-11ec-9ad5-160e4ff4a65d",
    }

    lambda_handler(event, {})