## CICD Pipeline Action Plan

Since the project repository is hosted on github I'd use github actions to create deployment piepline for this application.

### Frontend App
The app uses firebase-hosting service for hosting. The simple script is already available in the `deploy.sh` file
```shell
cd app
VITE_BACKEND_URL=https://epic-5jvzkowqrq-lm.a.run.app/ npm run build

cd ..
rm -rf public/*
cp -R app/dist/* public/

firebase deploy --only hosting
```
So creating a pipeline with similar commands would be sufficient here.

### Server
The server app is hosted using cloud run, therefore I'd still use it to create a deployment pipeline for the server app.
There is already a script `server/deploy.sh` available, so I'd use a similar strategy:

```shell
gcloud builds submit --tag gcr.io/epic-gcal/epic
gcloud run deploy --image gcr.io/epic-gcal/epic
```
