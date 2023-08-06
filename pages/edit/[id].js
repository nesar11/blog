import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField } from '@mui/material';
import tasks from '../../data/tasks';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  // Find the task with the given ID
  const task = tasks.find((task) => task.id === parseInt(id));

  // State variables to store updated title and description
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the task with the given ID
    const updatedTask = {
      ...task,
      title: title,
      description: description,
    };

    // Find the index of the task in the tasks array
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

    // Replace the old task with the updated task
    tasks[taskIndex] = updatedTask;

    // Redirect back to the home page after updating the task
    router.push('/');
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            required
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Update Task
        </Button>
      </form>
    </div>
  );
}
