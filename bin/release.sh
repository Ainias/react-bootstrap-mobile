#! /bin/bash

# Exit when a command fails
set -e

REPOSITORY=git@github.com:Ainias/react-bootstrap-mobile.git

if [[ -z "$1" ]]; then
  echo "versioname not given!"
  exit;
fi;

versionName=$1
versionExists="$(git ls-remote $REPOSITORY refs/tags/"$versionName"| tr -d '\n')"

if [ -n "$versionExists" ]; then
	echo "Version existiert bereits!";
	exit 1;
fi;

WORKING_DIR=$(pwd)
TMPDIR=$(mktemp -d)

cd "$TMPDIR";
git clone $REPOSITORY
cd react-windows

npm install --legacy-peer-deps
npm run build:production
git add dist/
npm version "$versionName"
#git push

#cd "$WORKING_DIR"
echo "$TMPDIR"

