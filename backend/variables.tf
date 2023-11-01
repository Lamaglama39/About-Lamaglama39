# システム共通名
variable "project_name" {
  type    = string
  default = "about-lamaglama39"
}

# 送信先メールアドレス
variable "email_address" {}

# CORS設定
variable "allow_origins" {}