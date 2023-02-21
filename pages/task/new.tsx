import React from 'react'
import { useQuery } from '../../convex/_generated/react'
import { HeaderWithLogin } from '../../components/login'
import { Status, Visibility } from '../../convex/schema'
import { EditableTaskDetails } from '../../components/taskDetails'

export default function CreateTaskPage() {
  const user = useQuery('getCurrentUser')
  if (user === null)
    // This page should only be accessible to logged-in users
    // so we should never reach this, but just in case
    throw new Error('User must be logged in to create a task')

  const newTaskInfo = {
    status: Status.NEW,
    visibility: Visibility.PUBLIC,
    ownerId: null,
  } as Partial<Document>

  return (
    user && (
      <main className="py-4">
        <HeaderWithLogin user={user} />
        <EditableTaskDetails
          user={user}
          mutationName="createTask"
          initialTaskInfo={newTaskInfo}
        />
      </main>
    )
  )
}
