import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: "ap-northeast-1" });
export const handler = async (event) => {
  console.log(event);

  // event.bodyからデータを解析
  let body;
  if (event.body) {
    body = JSON.parse(event.body);
  } else {
    // エラーハンドリング
    console.error("No body in the event");
    return { statusCode: 400, body: "No request body provided" };
  }

  // bodyからデータ取得
  const subject = "【問い合わせ】" + body.title;
  const email = body.email;
  const contents = body.contents;
  const message = email + "\n" + "\n" + contents;
  const topicArn = process.env.SNS_TOPIC;

  try {
    const response = await snsClient.send(
      new PublishCommand({
        Subject: subject,
        Message: message,
        TopicArn: topicArn,
      })
    );
    console.log(response);
    return { statusCode: 200, body: JSON.stringify(response) }; // 正常なレスポンス
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Internal Server Error" }; // エラーレスポンス
  }
};
