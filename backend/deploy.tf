# React LambdaURL追加処理
resource "null_resource" "build_and_deploy" {
  triggers = {
    lambda_url = aws_lambda_function_url.lambda_url.function_url
  }
  depends_on = [ aws_lambda_function_url.lambda_url ]

  provisioner "local-exec" {
    command = <<EOF
      cd ../frontend
      echo "VITE_LAMBDA_URL=${aws_lambda_function_url.lambda_url.function_url}" > .env
    EOF
  }
}