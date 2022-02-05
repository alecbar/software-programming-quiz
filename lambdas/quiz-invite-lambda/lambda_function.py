import boto3
import json


def lambda_handler(event, context):
    """
    Creates a quiz invite with provided details from event
    """

    # Setup cognito client
    client = boto3.client('cognito-idp')

    # Get user properties from event
    userId, quizId, email = event["userId"], event["quizId"], event["email"],

    try:
        response = client.admin_create_user(
            UserPoolId="us-east-1_mi0MGd08p",
            Username=email,
            UserAttributes=[
                {"Name": "userId", "Value": f"{userId}"},
                {"Name": "quizId", "Value": f"{quizId}"},
                {"Name": "email", "Value": email},
                {"Name": "email_verified", "Value": "true"}
            ],
            DesiredDeliveryMediums=['EMAIL']
        )

        return json.dumps(response)

    except Exception:
        return None