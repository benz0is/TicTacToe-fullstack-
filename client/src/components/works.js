async function Works() {
  try {
    const result = await fetch("http://localhost:5000/todos/1");
    const data = await result.json();
    return data.todo_id;
  } catch (e) {
    return null;
  }
}
export default Works;
