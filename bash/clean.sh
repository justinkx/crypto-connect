#!/bin/bash
# Clear local npm and RN cache and performs a fresh install

echo "Clear node modules"
rm -rf node_modules
echo "Verify npm cache"
npm cache verify
echo "Delete watchman cache"
watchman watch-del-all
echo "Delete metro temp files"
rm -fr $TMPDIR/metro*
echo "Install deps again"
npm install
