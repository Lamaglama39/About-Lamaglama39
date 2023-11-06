import axios from "axios";

// 投稿の取得
export const getArticlesFromQiita = async () => {
  try {
    const res = await axios.get(
      "https://qiita.com/api/v2/authenticated_user/items",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_QIITA_ACCESS_TOKEN}`,
        },
      }
    );
    console.log(res);
    if (!res) return undefined;
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
