#!/bin/bash
set -e
ROOT_DIR=$(pwd)
cd GlueBlue
if ! npm list expo >/dev/null 2>&1; then
  echo "Installing Expo and required deps..."
  npm install expo expo-build-properties @expo/configure-splash-screen || true
fi
# ensure eas login
if ! eas whoami >/dev/null 2>&1; then
  echo "Please login to eas before running this script"
  exit 1
fi
# run local build in GlueBlue working directory
eas build --platform android --profile preview --local
cd "$ROOT_DIR"
echo "Build finished"
