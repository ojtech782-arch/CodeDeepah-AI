EAS build credentials & setup

This file describes how to set up credentials for EAS builds (Android keystore, iOS signing).

Android
- `package` in app.json should be set (android package name). I added `com.yourcompany.glueblue` as a placeholder. Replace with your own reverse-domain package.
- During `eas build` the CLI will ask whether to generate or upload a keystore. For production builds you may want to upload your own keystore.

iOS
- `bundleIdentifier` must be set in app.json (I added `com.yourcompany.glueblue` placeholder).
- You need an Apple Developer account for iOS builds. EAS can manage certificates/profiles for you interactively.

EAS environment vars and secrets
- Use `eas secret:create` to set API keys or secrets you need at build time.

Common commands
- Login: `eas login`
- Build Android (production): `eas build -p android --profile production`
- Build iOS (production): `eas build -p ios --profile production`
- Submit: `eas submit -p android --latest`

Troubleshooting
- If EAS fails due to missing app identifiers, ensure `app.json` contains `android.package` and `ios.bundleIdentifier`.
- If builds fail due to credentials, run `eas credentials` and follow interactive prompts.
- For CI usage, create `EXPO_TOKEN` and set `EAS_BUILD_AUTOMATED=1` if needed.
