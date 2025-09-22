#!/bin/sh

# env.sh

# Change the contents of this output to get the environment variables
# of interest. The output must be valid JSON, with strings for both
# keys and values.
cat <<EOF
{
  "TF_VAR_oauth_client_secret": "$TF_VAR_oauth_client_secret"
}
EOF