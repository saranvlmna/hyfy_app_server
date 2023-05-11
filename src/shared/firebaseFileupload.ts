var admin = require("firebase-admin");
const uuid = require("uuid-v4");
import serviceAccount from "./firebaseKey.json";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "vingleapp.appspot.com",
});
var bucket = admin.storage().bucket();
export async function uploadFile(file: any) {
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid(),
    },
    contentType: "image/png",
    cacheControl: "public, max-age=31536000",
  };
  const data = await bucket.upload(file, {
    gzip: true,
    metadata: metadata,
  });
  const publicUrl =
    "https://firebasestorage.googleapis.com/v0/b/vingleapp.appspot.com/o/" +
    data[0].metadata.name +
    "?alt=media&token=" +
    data[0].metadata.metadata.firebaseStorageDownloadTokens;
  return publicUrl;
}
