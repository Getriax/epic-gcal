import admin from 'firebase-admin';

class FirebaseProvider {
  app: admin.app.App;
  db: admin.firestore.Firestore;
  constructor() {
    const configStringB64 = process.env.FIREBASE_CONFIG;
    if (!configStringB64) {
      throw new Error(
        'Could not initialize Firebase, missing FIREBASE_CONFIG env'
      );
    }

    let configString = Buffer.from(configStringB64, 'base64').toString('utf-8');
    configString = configString.slice(1, configString.length - 1);

    const config = JSON.parse(configString);

    this.app = admin.initializeApp({
      credential: admin.credential.cert(config),
    });
    this.db = this.app.firestore();
  }
}

export const firebaseProvider = new FirebaseProvider();
