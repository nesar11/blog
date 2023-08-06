import React from 'react';
import { useRouter } from 'next/router';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import fetchTasks from '../data/tasks';
import Link from 'next/link';

const cardStyle = {
  width: '100%',
  maxWidth: '400px',
  margin: '10px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow effect
};

const fetchTaskById = async (_id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/posts/find/${_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task details.');
    }
    const data = await response.json();
    console.log('Received data:', data); // Add this line to check the data
    return data;
  } catch (error) {
    console.error('Error fetching task details:', error);
    return null;
  }
};

export default function Home({ items }) {
  const router = useRouter();

  const handleEdit = async (_id) => {
    // Fetch the task details by ID
    const item = await fetchTaskById(_id);
    if (item) {
      // Redirect to the edit page with the task details as a query parameter
      router.push({
        pathname: `/edit/${_id}`,
        query: item,
      });
    }
  };
  const handleDelete = (id) => {
    // Display a confirmation dialog before deleting the task
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (!shouldDelete) {
      // User clicked Cancel, do nothing
      return;
    }

    // Send the DELETE request to delete the task
    fetch(`http://localhost:8000/api/posts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete task.');
        }
        return response.json();
      })
      .then((data) => {
        // Refresh the task list after successful deletion
        refreshTasks();
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div>
      <h1>Tasks</h1>
      <Link href="/new">New Task</Link>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            {' '}
            {/* Add the 'key' prop with the unique ID */}
            <Card variant="outlined" style={cardStyle}>
              <CardContent>
                <Typography variant="h4">{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </CardContent>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEdit(item._id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(item._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
            <ListItemSecondaryAction></ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export async function getServerSideProps() {
  const items = await fetchTasks();
  return {
    props: {
      items,
    },
  };
}
