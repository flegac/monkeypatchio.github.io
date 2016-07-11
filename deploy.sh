#!/usr/bin/env bash
DEST="../_master"

# Clean
if [ -d "$DEST" ]
then
  pushd $DEST
    echo "update master"
    git pull origin master
  popd
else
  echo "Clone master"
  git clone --depth 1 --branch master https://github.com/MonkeyPatchIo/monkeypatchio.github.io $DEST
fi

echo "Build"
jekyll build

pushd $DEST
  echo "Clean old files"
  find . -maxdepth 1 ! -name '.' ! -name '..' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;
popd

echo "Copy new files"
mv ./_site/* $DEST

pushd $DEST
  echo "Commit"
  git add -fA
  git commit -m "Update site at $(date)"
  git push origin master
popd

echo "Deployed Successfully!"
exit 0