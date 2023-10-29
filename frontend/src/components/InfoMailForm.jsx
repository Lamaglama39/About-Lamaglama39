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
        name: values.name,
        email: values.mail,
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
        <FormControl isInvalid={errors.name} w={["60vw", "50vw", "40vw"]}>
          <FormLabel htmlFor="name" fontSize={"1.5em"}>
            お名前
          </FormLabel>
          <Input
            w={"100%"}
            id="name"
            placeholder="お名前を入力してください。"
            {...register("name", {
              required: "必須項目です...。",
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
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
            {errors.name && errors.name.message}
          </FormErrorMessage>
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
            {errors.name && errors.name.message}
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
