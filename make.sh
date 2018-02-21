#!/usr/bin/env bash

function __with_docker() {
  docker run -ti --rm -v "$(pwd):/data" -u "$(id -u)" -p 4000:4000 loganmzz/jekyll:1.0.0 $*
}

function __with_jekyll() {
  __with_docker bundle install
  __with_docker bundle exec jekyll $*
}

function __cmd_build() {
  echo "Build"
  __with_jekyll build $*
}

function __cmd_serve() {
  echo "Serve"
  __with_jekyll serve -H 0.0.0.0 $*
}

function __cmd_deploy() {
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

  __cmd_build

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
}


command=$1
shift

case "${command}" in
  build|serve|deploy)
    "__cmd_${command}" $*
    ;;
  
  *)
    echo "Unknown command: ${command}" >&2
    exit 1
    ;;
esac
