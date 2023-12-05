import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { InfoMailAPI } from "./InfoMailAPI";
import { CiMail } from "react-icons/ci";

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
      textAlign={"center"}
      marginTop={["5em"]}
      marginX={"auto"}
      w={["60vw", "50vw", "40vw"]}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <FormControl isInvalid={errors.mail} marginBottom={"1em"}>
          <FormLabel htmlFor="mail" fontSize={"1.5em"}>
            メールアドレス
          </FormLabel>
          <Input
            borderColor={"teal.500"}
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

        <FormControl isInvalid={errors.title} marginBottom={"1em"}>
          <FormLabel htmlFor="title" fontSize={"1.5em"}>
            件名
          </FormLabel>
          <Input
            borderColor={"teal.500"}
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

        <FormControl isInvalid={errors.contents}>
          <FormLabel htmlFor="contents" fontSize={"1.5em"}>
            お問い合わせ内容
          </FormLabel>
          <Textarea
            borderColor={"teal.500"}
            resize={"none"}
            h={"15em"}
            id="contents"
            placeholder="お問い合わせ内容を入力してください。"
            {...register("contents", {
              required: "必須項目です...。",
            })}
            fontFamily={`Inter, system-ui, Avenir, Helvetica, Arial, sans-serif`}
          />
          <FormErrorMessage>
            {errors.contents && errors.contents.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          marginY={"1em"}
          colorScheme="teal"
          className="selectButton"
          isLoading={isSubmitting}
          type="submit"
          border={"none"}
          fontSize={"1.5em"}
        >
          <CiMail style={{ marginRight: "0.5em" }} />
          送信
        </Button>
      </form>
    </Box>
  );
};
