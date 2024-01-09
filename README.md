# Welcome to Epic-Gcal
#### This repository contains project files for [epicbrief](https://www.epicbrief.com/) recruitment task

## Idea
The idea of this app is to allow users to connect with their google account and list their next 10 calendar events.

### Links
* The app, hosted with firebase hosting, is available here
  * https://epic-gcal.web.app
* Server is hosted via cloud run, api docs available under the link
  * https://epic-5jvzkowqrq-lm.a.run.app/docs

## Technologies

### Frontend
* React
* Typescript
* Chackra UI
* Vite
* Firebase Hosting

### Backend
* Express
* Typescript
* Google Auth
* Firestore
* OpenAPI
* Docker
* Cloud Run

## Project Directory Structure

### Root Directory

- `firestore.rules`: Firebase security rules for Firestore database.
- `firebase.json`: Configuration file for Firebase services.
- `deploy.sh`: Shell script for deployment processes.
- `public`: Contains publicly accessible files.
- `app`: Frontend application folder.
- `server`: Backend server folder.

### App Directory

- `index.html`: Entry HTML file for the frontend.
- `dist`: Compiled and bundled files ready for deployment.
- `public`: Publicly accessible files for the app.
- `vite.config.ts`: Configuration file for Vite.
- `src`: Source code of the frontend application.
    - `App.tsx`: Main React component.
    - `main.tsx`: Entry point for the React app.
    - `api`: Contains API related files.
    - `assets`: Assets specific to the app.
    - `compontents`: React components for the app.

### Server Directory

- `Dockerfile`: Instructions for Docker to build the server's container.
- `deploy.sh`: Deployment script for the server.
- `build`: Compiled server files.
- `openapi.json`: OpenAPI specification for the server's API.
- `src`: Source code of the backend server.
    - `types`: TypeScript type definitions.
    - `core`: Core functionalities of the server.
    - `app.ts`: Main file to start the server.
    - `repositories`: Data access layers.
    - `actions`: Business logic implementations.
    - `controllers`: Controllers to handle API requests.
    - `services`: Service layer with business logic.
