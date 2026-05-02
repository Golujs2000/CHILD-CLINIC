// ─────────────────────────────────────────────────────────────
// services/hospitalServices.js
// Firestore CRUD for the `hospitalServices` collection.
// Hospital services are general offerings (e.g. "24/7 Emergency",
// "Ambulance") displayed on the homepage and About page.
// Each document has an `order` field to control display sequence.
// ─────────────────────────────────────────────────────────────

import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'

const COL = 'hospitalServices'

// Fetch all hospital services sorted by display order
export async function getHospitalServices() {
  const q = query(collection(db, COL), orderBy('order'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// Add a new hospital service
export async function addHospitalService(data) {
  return addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp() })
}

// Update an existing hospital service
export async function updateHospitalService(id, data) {
  return updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() })
}

// Delete a hospital service
export async function deleteHospitalService(id) {
  return deleteDoc(doc(db, COL, id))
}
