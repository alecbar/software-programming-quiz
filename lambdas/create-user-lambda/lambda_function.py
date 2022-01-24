import boto3

def lambda_handler(event, context):
    """
    Creates a new user in cognito user pool with provided details from event
    """

    # Setup cognito client
    client = boto3.client('cognito-idp')

    # Get user properties from event
    first_name, last_name, email, organization = event["firstName"], event["lastName"], event["email"], event["organization"]
    
    try:
        response = client.admin_create_user(
            UserPoolId = "us-east-1_mi0MGd08p",
            Username = email,
            UserAttributes = [
                { "Name": "name", "Value": f"{first_name} {last_name}"},
                { "Name": "email", "Value": email},
                { "Name": "custom:organization", "Value": organization},
                { "Name": "email_verified", "Value": "true" }
            ],
            DesiredDeliveryMediums = ['EMAIL']
        )

        return response

    except Exception:
        return None