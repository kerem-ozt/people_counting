//gerekli paketlerin ve modüllerin yüklenmesi
import admin from 'firebase-admin'
import cred from './peoplecounting-4f4a4-firebase-adminsdk-a3t7e-c71eac0a93.json' assert { type: "json" };

export function databaseconnection() {
  admin.initializeApp({
    credential: admin.credential.cert(cred)
    // databaseURL: "https://peoplecounting-4f4a4-default-rtdb.firebaseio.com",
  })
}