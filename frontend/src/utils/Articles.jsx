import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import { ArticleCard } from "./ArticleCard";
import { getArticlesFromQiita } from "./getArticlesFromQiita";

export const Articles = forwardRef((props, ref) => {
  const [articles, setArticles] = useState([]);

  const setData = (articleData) => {
    if (!articleData) {
      setArticles([]);
      console.log("faild");
    } else {
      const Data = articleData.map((data) => {
        return {
          comments_count: data.comments_count,
          created_at: data.created_at,
          id: data.id,
          likes_count: data.likes_count,
          private: data.private,
          reactions_count: data.reactions_count,
          stocks_count: data.stocks_count,
          tags: data.tags,
          title: data.title,
          updated_at: data.updated_at,
          url: data.url,
          page_views_count: data.page_views_count,
        };
      });
      setArticles(Data);
    }
  };

  React.useEffect(() => {
    getArticlesFromQiita().then(setData);
  }, []);

  return (
    <>
      <Box height={"3em"}></Box>
      <Box
        padding={["2em"]}
        rowGap={"2em"}
        display={"flex"}
        flexFlow={["column", "row wrap", "row wrap"]}
        justifyContent={"space-evenly"}
        ref={ref}
      >
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            comments_count={article.comments_count}
            created_at={article.created_at}
            id={article.id}
            likes_count={article.likes_count}
            page_views_count={article.page_views_count}
            private={article.private}
            tags={article.tags}
            title={article.title}
            updated_at={article.updated_at}
            url={article.url}
          ></ArticleCard>
        ))}
      </Box>
    </>
  );
});

Articles.displayName = "Articles";
