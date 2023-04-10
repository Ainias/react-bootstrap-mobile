#! /bin/bash

# Exit when a command fails
set -e

ORIGIN_DIR=$(pwd)

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

TMPDIR=$(mktemp -d)

cd "$TMPDIR";
git clone $REPOSITORY project
cd project

npm install
npm run build:production
git add -u
git commit -m "pre-version-commit for version $versionName" || echo "no commit needed"
npm version "$versionName"
npm publish
git push

echo "$TMPDIR"

cd "$ORIGIN_DIR"
git pull
