import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import tasks from '../../data/tasks';

export default function Delete() {
  const router = useRouter();
  const { id } = router.query;

  // Find the task with the given ID
  const task = tasks.find((task) => task.id === parseInt(id));

  const handleDelete = () => {
    // Filter out the task with the given ID from the tasks array
    const updatedTasks = tasks.filter((task) => task.id !== parseInt(id));

    // Update the tasks array with the filtered tasks
    tasks.length = 0;
    Array.prototype.push.apply(tasks, updatedTasks);

    // Redirect back to the home page after deleting the task
    router.push('/');
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>Delete Task</h1>
      <p>Are you sure you want to delete this task?</p>
      <Button onClick={handleDelete} variant="contained" color="secondary">
        Yes, delete
      </Button>
      <Button onClick={() => router.push('/')} variant="contained">
        Cancel
      </Button>
    </div>
  );
}
