import firebase from '../../../firebase'

export async function createUser() {
  const authUser = firebase.auth().currentUser
  const { uid, email, displayName } = authUser
  const firstName = displayName ? displayName.split(' ')[0] : ''
  const lastName = displayName ? displayName.split(' ')[1] : ''

  const existingUser = await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => doc.exists)

  if (!existingUser) {
    firebase.firestore().collection('users').doc(uid).set({
      email: email,
      firstName,
      lastName,
      id: uid,
    })
  }
}

export async function createRun({ userId, runId, runData }) {
  if (!userId || !runData) return

  const runPathRef = firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('runs')

  if (runId) {
    await runPathRef.doc(runId).set(runData, { merge: true })
  } else {
    const created = new Date()
    await runPathRef.add({ created, isDeleted: false, ...runData })
  }
}
