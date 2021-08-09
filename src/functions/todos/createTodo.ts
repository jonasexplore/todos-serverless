import { document } from "../../utils/dynamodbClient";
import { v4 as uuid } from "uuid";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body);
  const { userid: user_id } = event.pathParameters;

  const id = new uuid();

  await document
    .put({
      TableName: "todos",
      Item: {
        id,
        user_id,
        title,
        done: false,
        deadline,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "created",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
