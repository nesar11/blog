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

export default function Home({ items }) {
  const router = useRouter();

  const handleEdit = async (id) => {
    try {
      // Fetch the item details for the given id
      const item = await fetchTaskById(id);

      // Redirect to the edit page with the item data as query parameter
      router.push({
        pathname: `/edit/${id}`,
        query: { taskData: JSON.stringify(item) },
      });
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };

  const handleDelete = (id) => {
    // Redirect to the delete page with the item ID as a parameter
    console.log('item deleted success', id);
    router.push(`/delete/${id}`);
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
                onClick={() => handleEdit(item.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(item.id)}
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
