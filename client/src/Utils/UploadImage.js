import { storage } from "../firebase";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const uploadImage = async (file) => {
  try {

    const imageRef = ref(
      storage,
      `portfolio/${Date.now()}-${file.name}`
    );

    // upload
    await uploadBytes(imageRef, file);

    // get URL
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;

  } catch (err) {
    console.error(err);
    throw err;
  }
};