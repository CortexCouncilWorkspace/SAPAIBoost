locals {
    apis = [ "serviceusage.googleapis.com",
    "firebase.googleapis.com",
    "aiplatform.googleapis.com" ]
}

resource "google_project_service" "api_activation" {
  for_each = toset(local.apis)
  project = google_project.my_project.project_id
  service = each.value

  # Don't disable the service if the resource block is removed by accident.
  disable_on_destroy = false
}