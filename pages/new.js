import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField } from '@mui/material';
import tasks from '../data/tasks';

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Center the form vertically in the viewport
};

const formStyle = {
  padding: '20px',
  maxWidth: '400px',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

export default function New() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Generate a new unique ID for the new task
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

    // Create the new task object
    const newTask = {
      id: newId,
      title: title,
      description: description,
      completed: false,
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Redirect back to the home page after creating the task
    router.push('/');
  };

  return (
    <div style={formContainerStyle}>
      <div style={formStyle}>
        <h1>New Task</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth // Set the input to take full width
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              required
              fullWidth // Set the input to take full width
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Create Task
          </Button>
        </form>
      </div>
    </div>
  );
}
