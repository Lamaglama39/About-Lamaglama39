import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { InfoMailAPI } from "./InfoMailAPI";

export const InfoMailForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(values) {
    try {
      // メール送信用のAPI関数
      const response = await InfoMailAPI({
        email: values.mail,
        title: values.title,
        contents: values.contents,
      });

      if (response.error) {
        // エラーハンドリング
        console.error(`Error: ${response.error}`);
      } else {
        // 成功した場合
        console.log("Email sent successfully");
        reset(); // フォームリセット
      }
    } catch (error) {
      // 予期しないエラー
      console.error("An unexpected error occurred:", error);
    }
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      marginTop={["3em", "3em", "10em"]}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.mail} w={["60vw", "50vw", "40vw"]}>
          <FormLabel htmlFor="mail" fontSize={"1.5em"}>
            メールアドレス
          </FormLabel>
          <Input
            w={"100%"}
            id="mail"
            placeholder="あなたのメールアドレスを入力してください。"
            {...register("mail", {
              required: "必須項目です...。",
            })}
          />
          <FormErrorMessage>
            {errors.mail && errors.mail.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.title} w={["60vw", "50vw", "40vw"]}>
          <FormLabel htmlFor="title" fontSize={"1.5em"}>
            件名
          </FormLabel>
          <Input
            w={"100%"}
            id="title"
            placeholder="件名を入力してください。"
            {...register("title", {
              required: "必須項目です...。",
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.contents} w={["60vw", "50vw", "40vw"]}>
          <FormLabel htmlFor="contents" fontSize={"1.5em"}>
            お問い合わせ内容
          </FormLabel>
          <Input
            w={"100%"}
            h={"15em"}
            id="contents"
            placeholder="お問い合わせ内容を入力してください。"
            {...register("contents", {
              required: "必須項目です...。",
            })}
          />
          <FormErrorMessage>
            {errors.contents && errors.contents.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          marginTop={"1em"}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          送信する？
        </Button>
      </form>
    </Box>
  );
};
