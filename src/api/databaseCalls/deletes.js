import firebase from 'firebase'

export async function deleteRun({ userId, runId }) {
  if (!userId) return

  if (runId) {
    await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('runs')
      .doc(runId)
      .set({ isDeleted: true }, { merge: true })
  }
}
