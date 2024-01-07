#!/bin/bash

# Path to your .env file
ENV_FILE=".env"

# Base gcloud command
GCLOUD_CMD="gcloud run deploy --image gcr.io/epic-gcal/epic"

escape_newlines() {
    echo "$1" | sed ':a;N;$!ba;s/\n/\\n/g'
}

# Read each line in the .env file
while IFS='=' read -r key value; do
  # Skip empty lines and lines starting with #
  if [[ ! -z "$key" && ! $key == \#* ]]; then
    # Special handling for FIREBASE_CONFIG
    if [ "$key" == "FIREBASE_CONFIG" ]; then
      # Escape newlines in the private key
      value=$(escape_newlines "$value")
    fi

    # Append each environment variable to the command
    GCLOUD_CMD+=" --set-env-vars $key='$value'"
  fi
done < "$ENV_FILE"

# Execute the command
echo "Executing command: $GCLOUD_CMD"

gcloud builds submit --tag gcr.io/epic-gcal/epic
eval $GCLOUD_CMD
