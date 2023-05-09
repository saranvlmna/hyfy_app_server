var admin = require("firebase-admin");
const uuid = require("uuid-v4");
import serviceAccount from "./firebaseCredentials.json";

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
  const publicUrl = `https://storage.googleapis.com/${data[0].metadata.bucket}/${data[0].metadata.name}`;
  console.log(publicUrl);
  return publicUrl;
}
