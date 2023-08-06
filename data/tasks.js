async function fetchTasks() {
  const response = await fetch('http://localhost:8000/api/posts');
  const data = await response.json();
  return data;
}

export default fetchTasks;
