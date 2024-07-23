import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey, // proccess.env.REACT_APP_apiKey
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

const notificationsCollectionRef = collection(db, "notifications");

export const addNotification = async (newNotification) => {
  try {
    const newNotificationRef = doc(notificationsCollectionRef);
    const { id } = newNotificationRef;

    const notificationToCreate = {
      ...newNotification,
      id,
      createdAt: serverTimestamp(),
    };

    await setDoc(newNotificationRef, notificationToCreate);

    return notificationToCreate;
  } catch (error) {
    console.error(error);
  }
};

export const getNotification = async () => {
  try {
    const q = query(notificationsCollectionRef);
    const querySnapshot = await getDocs(q);
    const array = [];

    querySnapshot.forEach((doc) => {
      array.push(doc.data());
    });

    return array;
  } catch (error) {
    console.error(error);
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    await deleteDoc(doc(notificationsCollectionRef, notificationId));
  } catch (error) {
    console.error(error);
  }
};
