variable "project_id"{
    type = string
    description = "The ID of the project for the app"
}

variable "region" {
    type = string
    description = "GCP region for app deployment"
}

variable "oauth_client_secret" {
  type = string

  description = "OAuth client secret. For this test, we pass in this secret through the environment variable TF_VAR_oauth_client_secret. In a real app, you should use a secret manager service."

  sensitive = true
}

variable "oauth_client_id" {
  type = string

  description = "OAuth client ID"

  sensitive = true
}

