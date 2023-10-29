import axios from "axios";

export async function InfoMailAPI(emailData) {
  try {
    console.log(emailData);
    const response = await axios.post(
      import.meta.env.VITE_LAMBDA_URL,
      emailData
    );
    return { status: response.status };
  } catch (error) {
    if (error.response && error.response.status) {
      // サーバーからのレスポンスがある場合、エラーステータスを返す
      return { error: error.response.status };
    }
    // その他のエラー
    console.error(error); // errorの詳細をログに記録
    return { error: "Network error or the server is down." };
  }
}

export default InfoMailAPI;
