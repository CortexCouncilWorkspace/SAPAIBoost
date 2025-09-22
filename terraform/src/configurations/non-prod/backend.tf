terraform {
  backend "gcs" {
    bucket  = "argolis-palkin-terraform-states"
    prefix  = "sapboost-ai-toolbox/non-prod"
  }
}

