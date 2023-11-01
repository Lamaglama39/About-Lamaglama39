# zip処理
data "archive_file" "function_source" {
  type        = "zip"
  source_dir  = "app/function"
  output_path = "archive/lambda_function.zip"
}

# Lambda関数
resource "aws_lambda_function" "lambda" {
  architectures = ["x86_64"]

  ephemeral_storage {
    size = "512"
  }

  function_name                  = "${var.project_name}-lambda"
  handler                        = "index.handler"
  memory_size                    = "128"
  package_type                   = "Zip"
  reserved_concurrent_executions = "-1"
  role                           = aws_iam_role.iam_role.arn
  runtime                        = "nodejs18.x"
  filename                       = data.archive_file.function_source.output_path
  source_code_hash               = data.archive_file.function_source.output_base64sha256

  timeout = "30"

  environment {
    variables = {
      SNS_TOPIC = aws_sns_topic.topic.arn
    }
  }
  tracing_config {
    mode = "PassThrough"
  }
}

# Lambda URL
resource "aws_lambda_function_url" "lambda_url" {
  function_name      = aws_lambda_function.lambda.function_name
  authorization_type = "NONE"
  
  cors {
    allow_credentials = true
    allow_origins     = ["${var.allow_origins}"]
    allow_methods     = ["POST"]
    allow_headers     = ["*"]
    expose_headers    = ["*"]
    max_age           = 86400
  }
}

# Lambda用IAMロール
resource "aws_iam_role" "iam_role" {
  assume_role_policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
POLICY

  description          = "iam_role_lambda-line-bot"
  managed_policy_arns  = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole", "arn:aws:iam::aws:policy/service-role/AWSIoTDeviceDefenderPublishFindingsToSNSMitigationAction"]
  max_session_duration = "43200"
  name                 = "${var.project_name}-iam-role"
  path                 = "/"
}