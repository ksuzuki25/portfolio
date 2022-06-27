provider "aws" {
  region                      = "ap-northeast-1"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  endpoints {
    dynamodb = "http://db:8000"
  }
}

terraform {
  required_version = "~> 1.0.0"
}

# --------------------------------------------------------
# DynamoDB

resource "aws_dynamodb_table" "kobuhei-development-test-todo-list" {
  name           = "kobuhei-development-test-todo-list"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10

  hash_key       = "HashId"
  range_key      = "RangeId"

  attribute {
    name = "HashId"
    type = "S"
  }

  attribute {
    name = "RangeId"
    type = "S"
  }
}

# # --------------------------------------------------------
# # DynamoDB Values

locals {
  json_todo_list  = file("./seed/todo_list.json")
  todo_list       = jsondecode(local.json_todo_list)
}

resource "aws_dynamodb_table_item" "kobuhei-development-test-todo-list" {
  for_each = local.todo_list

  table_name  = aws_dynamodb_table.kobuhei-development-test-todo-list.name
  hash_key    = aws_dynamodb_table.kobuhei-development-test-todo-list.hash_key
  range_key   = aws_dynamodb_table.kobuhei-development-test-todo-list.range_key

  item = jsonencode(each.value)
}
