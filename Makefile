SHELL=/bin/bash

.PHONY: guide run-android standard
.DEFAULT_GOAL: guide

guide:
	@echo "please pass correct target name"

run-android:
	@react-native run-android

reset:
	@react-native start --reset-cache

bundle:
	@react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

assemble-release:
	@cd android && chmod +x gradlew && ./gradlew assembleRelease

remove-duplicates:
	@cd ~/trendingorbit/djmusicweb/apps/DJMusicWeb/android/app/src/main/res && find . -name "node_modules_*" -type f -exec rm {} \;
	@cd ~/trendingorbit/djmusicweb/apps/DJMusicWeb/android/app/src/main/res && find . -name "image_equalizer.gif" -type f -exec rm {} \;
	@cd ~/trendingorbit/djmusicweb/apps/DJMusicWeb/android/app/src/main/res && find . -name "image_dmw_logo.png" -type f -exec rm {} \;
	@cd ~/trendingorbit/djmusicweb/apps/DJMusicWeb/android/app/src/main/res && find . -name "image_personplaceholder.png" -type f -exec rm {} \;
	@cd ~/trendingorbit/djmusicweb/apps/DJMusicWeb/android/app/src/main/res && find . -name "app.json" -type f -exec rm {} \;
	@cd ~/trendingorbit/djmusicweb/apps/DJMusicWeb

standard:
	@standard --fix