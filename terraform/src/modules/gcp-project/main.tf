locals {
    admins = ["admin@palkin.altostrat.com",
              "admin@adrianbe.altostrat.com",
              "admin@ekakruse.altostrat.com"]
}

resource "google_project" "my_project" {
  name       = var.project_name
  project_id = var.project_id
  folder_id     = var.folder_id
  billing_account = "0164AC-D3A4BB-CF1EEC"
  deletion_policy = "DELETE"

  # Required for the project to display in a list of Firebase projects.
  labels = {
    "firebase" = "enabled"
  }
}

module "org-policy" {
  source  = "terraform-google-modules/org-policy/google"
  version = "~> 5.0"

  policy_for  = "project"
  project_id  = var.project_id
  constraint  = "iam.allowedPolicyMemberDomains"
  policy_type = "list"
  enforce     = false
  depends_on = [ google_project.my_project ]
}

resource "time_sleep" "wait_15_seconds" {
  depends_on = [module.org-policy]
  create_duration = "15s"
}

resource "google_project_iam_member" "project_owner" {
  for_each = toset(local.admins)
  project = var.project_id
  role    = "roles/editor"
  member  = "user:${each.value}"
  depends_on = [ time_sleep.wait_15_seconds ]
}

resource "google_project_iam_member" "project_iam_admin" {
  for_each = toset(local.admins)
  project = var.project_id
  role    = "roles/resourcemanager.projectIamAdmin"
  member  = "user:${each.value}"
  depends_on = [ time_sleep.wait_15_seconds ]
}

