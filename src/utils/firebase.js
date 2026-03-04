import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';

/*
  🔧 YOUR FIREBASE CONFIG
  Already configured for studyaura-25e57 project.
  To use a different project, replace the values below.
*/
const firebaseConfig = {
  apiKey: "AIzaSyDcdEldNuuc0r8ZEaoaUPKRAE7j7BoWOaU",
  authDomain: "studyaura-25e57.firebaseapp.com",
  projectId: "studyaura-25e57",
  storageBucket: "studyaura-25e57.firebasestorage.app",
  messagingSenderId: "143774118661",
  appId: "1:143774118661:web:11443bf72e4835bdcf3d6c",
  measurementId: "G-YR2RELNLPQ"
};

let app = null;
let db = null;
let firebaseReady = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  firebaseReady = true;
} catch (e) {
  console.log('Firebase init failed — running in offline mode.', e);
}

export { db, firebaseReady };

// ===== LIKES =====
export function subscribeLikes(callback) {
  if (!firebaseReady) return () => {};
  try {
    const ref = doc(db, 'studyaura', 'likes');
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        callback(snap.data().count || 0);
      } else {
        callback(0);
      }
    }, (error) => {
      console.warn('Likes listener error:', error.message);
      callback(0);
    });
  } catch (e) {
    console.warn('subscribeLikes failed:', e.message);
    return () => {};
  }
}

export async function addLikeToFirebase() {
  if (!firebaseReady) return false;
  try {
    const ref = doc(db, 'studyaura', 'likes');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await updateDoc(ref, { count: increment(1) });
    } else {
      await setDoc(ref, { count: 1 });
    }
    return true;
  } catch (e) {
    console.warn('addLike failed:', e.message);
    return false;
  }
}

// ===== COMMENTS =====
export async function submitCommentToFirebase(name, message, theme) {
  if (!firebaseReady) return false;
  try {
    await addDoc(collection(db, 'studyaura_comments'), {
      name,
      message,
      theme,
      timestamp: serverTimestamp()
    });
    return true;
  } catch (e) {
    console.warn('submitComment failed:', e.message);
    return false;
  }
}
