cd app
npm run build

cd ..
rm -rf public/*
cp -R app/dist/* public/

firebase deploy --only hosting

cd server
./deploy.sh
