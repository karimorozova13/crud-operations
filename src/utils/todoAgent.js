import axios from "axios";

const todoAxios = axios.create({
  baseURL: "http://localhost:5000",
});

const todoAgent = {
  getTodoList: async () => {
    const response = await todoAxios.get("/api/todos");
    return response.data.todos;
  },
  createNewTodo: async (newMessgae) => {
    const response = await todoAxios.post("/api/todos", {
      message: newMessgae,
    });
    return response.data.todo;
  },
  deleteTodo: async (id) => {
    const response = await todoAxios.delete(`/api/todos/${id}`);
    return response.data.todo;
  },
  updateTodo: async (id, message, completed) => {
    const response = await todoAxios.put(`/api/todos/${id}`, {
      message,
      completed,
    });
    return response.data.todo;
  },
};

export default todoAgent;
