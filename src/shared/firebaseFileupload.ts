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
  console.log(data);
  const publicUrl = `https://storage.googleapis.com/${data[0].metadata.bucket}/${data[0].metadata.name}`;
  return publicUrl;
}
