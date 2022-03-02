import json
import boto3


def lambda_handler(event, context):
    """
    Get speciic quiz using id
    """
    # Get user properties from event
    quizId = event["quizId"]

    # Get quiz data
    s3 = boto3.resource("s3", aws_access_key_id="AKIASWF5A4FLAUPQKDIB", aws_secret_access_key="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")
    obj = s3.Object("software-programming-quiz-document-bucket", quizId)

    data = obj.get()['Body'].read().decode('utf-8')

    return data

if __name__ == "__main__":

    event = {
        "quizId": "d3fd8e30-99e7-11ec-9ad5-160e4ff4a65d",
    }

    lambda_handler(event, {})