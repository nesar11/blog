import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch the existing task data based on the ID
    if (id) {
      fetch(`http://localhost:8000/api/posts/find/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch task details.');
          }
          return response.json();
        })
        .then((data) => {
          // Handle the fetched data
          setTitle(data.title);
          setDescription(data.description);
        })
        .catch((error) => {
          console.error('Error fetching task details:', error);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the updated data
    const updatedTask = {
      title: title,
      description: description,
    };

    // Send the PATCH request to update the task data
    fetch(`http://localhost:8000/api/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update task data.');
        }
        return response.json();
      })
      .then((data) => {
        // Redirect back to the home page after editing the task
        router.push('/');
      })
      .catch((error) => {
        console.error('Error updating task data:', error);
      });
  };

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
          Save Changes
        </Button>
      </form>
    </div>
  );
}
