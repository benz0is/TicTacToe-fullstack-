class Works {
  api() {
    return fetch("/todos/58").then((res) => {
      return res.json();
    });
  }
}
export default Works;
