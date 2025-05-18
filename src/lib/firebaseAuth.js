import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user };
  } catch (error) {
    return { error };
  }
};
