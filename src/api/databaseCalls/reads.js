import firebase from '../../../firebase'
import { createUser } from './writes'

export async function getUserById({ id, cb }) {
  if (!id || !cb) return null
  firebase
    .firestore()
    .collection('users')
    .doc(id)
    .onSnapshot((doc) => {
      if (doc.exists) {
        cb({ ...doc.data() })
      } else {
        // Create user if user doesn't exist
        createUser()
      }
    })
}

export async function getRunsByUserId({ userId, cb }) {
  if (!userId || !cb) return null

  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('runs')
    .where('isDeleted', '==', false)
    .orderBy('created', 'asc')
    .onSnapshot((query) => {
      const runs = query?.docs?.map((runDoc) => ({
        id: runDoc.id,
        ...runDoc.data(),
      }))
      cb(runs)
    })
}
