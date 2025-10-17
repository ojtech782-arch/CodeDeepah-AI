#!/bin/bash
set -e
ROOT_DIR=$(pwd)
cd GlueBlue
eas build --platform android --profile preview --local
cd GlueBlue
echo "Skipping auto-install of expo packages in helper script. Please run 'npm install' inside GlueBlue if dependencies missing."
if ! eas whoami >/dev/null 2>&1; then
  echo "Please login to eas before running this script"
  exit 1
fi
# Use development profile (dev client) for local builds where available
eas build --platform android --profile development --local
cd "$ROOT_DIR"
echo "Build finished"
