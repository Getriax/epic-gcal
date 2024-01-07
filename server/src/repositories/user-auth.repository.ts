import { firebaseProvider } from '../core/firebase';
import { firestore } from 'firebase-admin';
import CollectionReference = firestore.CollectionReference;
import { Credentials } from 'google-auth-library';

export interface UserAuth extends Credentials {}

class UserAuthRepository {
  private collection: CollectionReference;
  constructor(db = firebaseProvider.db) {
    this.collection = db.collection('auth');
  }

  async saveUserToken(email: string, tokenData: Credentials) {
    await this.collection.doc(email).set(tokenData);
  }

  async getUserToken(email: string): Promise<UserAuth | null | undefined> {
    const doc = await this.collection.doc(email).get();

    if (!doc.exists) {
      return null;
    } else {
      return doc.data();
    }
  }

  async deleteUserToken(email: string) {
    await this.collection.doc(email).delete();
  }
}

export const userAuthRepository = new UserAuthRepository();
