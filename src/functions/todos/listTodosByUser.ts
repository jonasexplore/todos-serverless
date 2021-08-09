import { document } from "../../utils/dynamodbClient";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid: user_id } = event.pathParameters;

  const response = await document
    .query({
      TableName: "todos",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": user_id,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
