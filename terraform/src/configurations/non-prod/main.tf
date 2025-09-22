# Run the script to get the environment variables of interest.
# This is a data source, so it will run at plan time.
data "external" "env" {
  program = ["${path.module}/env.sh"]

  # For Windows (or Powershell core on MacOS and Linux),
  # run a Powershell script instead
  #program = ["${path.module}/env.ps1"]
}

locals {    
    folder_id = "928188454043"
    project_name = "sapboost-ai-4cdf-nonprod"
    project_id = "sapboost-ai-4cdf-nonprod"
    region = "europe-west1"
    oauth_client_id = "1022151286765-id3ertjpl53etspt77venjnjn6ur5mfu.apps.googleusercontent.com"
    oauth_client_secret = data.external.env.result["TF_VAR_oauth_client_secret"]
}


module "gcp_project"{
    source = "../../modules/gcp-project"
    folder_id = local.folder_id
    project_name = local.project_name
    project_id = local.project_id
}

module "firebase_project" {
    source = "../../modules/firebase-project"
    project_id = local.project_id
    region = local.region

    oauth_client_secret = local.oauth_client_secret
    oauth_client_id = local.oauth_client_id

    depends_on = [ module.gcp_project ]
}

module "angular-app" {
    source = "../../modules/angular-app"

    region = local.region
    project_id = local.project_id

    depends_on = [ module.firebase_project ]

}