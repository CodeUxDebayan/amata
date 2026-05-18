import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ── PRODUCTS ──────────────────────────────────────────────────────────

export async function getProducts() {
  const snap = await getDocs(collection(db, 'products'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductBySlug(slug) {
  const q = query(collection(db, 'products'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

// ── ORDERS ────────────────────────────────────────────────────────────

export async function createOrder(orderData) {
  const ref = await addDoc(collection(db, 'orders'), {
    ...orderData,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateOrderStatus(orderId, status, paymentData = {}) {
  await updateDoc(doc(db, 'orders', orderId), {
    status,
    ...paymentData,
    updatedAt: serverTimestamp(),
  });
}

export async function getOrdersByUser(uid) {
  const q = query(
    collection(db, 'orders'),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ── USERS ─────────────────────────────────────────────────────────────

export async function upsertUser(uid, data) {
  await setDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getUser(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ── NEWSLETTER ────────────────────────────────────────────────────────

export async function subscribeEmail(email) {
  await setDoc(
    doc(db, 'newsletter', email),
    { email, subscribedAt: serverTimestamp() },
    { merge: true },
  );
}
