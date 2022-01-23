import boto3

def lambda_handler(event, context):
    """
    """

    # Setup cognito client
    client = boto3.resource('cognito')

    # Get user properties from event
    first_name, last_name, email, company = event["firstName"], event["lastName"], event["email"], event["company"]
    
    response = client.admin_create_user(
        UserPoolId = "",
        Username = email,
        UserAttributes = [
            { "Name": "name", "Value": f"{first_name} {last_name}"},
            { "Name": "email", "Value": email},
            { "Name": "custom:company", "Value": company},
            { "Name": "email_verified", "Value": "true" }
        ],
        DesiredDeliveryMediums = ['EMAIL']
    )

    print(response)

    return None