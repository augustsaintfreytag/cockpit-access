#! /usr/bin/env sh

SCRIPT_DIR=$(dirname "$0")
PROJECT_DIR=$(realpath "$SCRIPT_DIR/..")
PROJECT_NAME=$(basename "$PROJECT_DIR")
TMP_DIR="/var/tmp/$PROJECT_NAME"

cd "$PROJECT_DIR" || (echo "Could not change to project directory '$PROJECT_DIR'." && exit 1)

if [ ! -e ./package.json ]
then
	echo "Working directory '$PROJECT_DIR' is not a valid project directory."
	exit 1
fi

echo "Copying project data for $PROJECT_NAME to temporary working directory '$TMP_DIR' for deferred build."
mkdir -p "$TMP_DIR"

touch "$TMP_DIR/.development"
cp package.json "$TMP_DIR/"
cp yarn.lock "$TMP_DIR/"
cp tsconfig.json "$TMP_DIR/"
cp -R scripts "$TMP_DIR/"
cp -R src "$TMP_DIR/"
touch "$TMP_DIR/.development"

cd "$TMP_DIR" || (echo "Could not change to temporary directory '$TMP_DIR'." && exit 1)

if [ ! -e ./package.json ]
then
	echo "Working directory '$TMP_DIR' for $PROJECT_NAME is not a valid project directory, copy incomplete."
	exit 1
fi

echo "Installing $PROJECT_NAME project development dependencies for deferred build."
yarn --update-checksums
yarn install --production=false

echo "Building $PROJECT_NAME project in temporary directory."
yarn build

echo "Copying $PROJECT_NAME output project distribution files from deferred build."
rm -r "$PROJECT_DIR/dist/*" || true
cp -R "$TMP_DIR/dist" "$PROJECT_DIR/"

rm -r "$TMP_DIR"