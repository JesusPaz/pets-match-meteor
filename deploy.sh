# deploy.sh

#!/usr/bin/env sh

# abort on errors
set -e

# build
# echo Linting..
# npm run lint
echo Building. this may take a minute...
meteor build dist --directory --architecture os.linux.x86_64

echo Deploying..
git add .
git commit -m 'deploy to dist into branch to deploy'

# deploy
git push -f https://github.com/JesusPaz/pets-match-meteor.git master:heroku

rm -r dist

