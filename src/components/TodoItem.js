import todoAgent from "@/utils/todoAgent";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const TodoItem = ({ item, reFetch = async () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(item.message);
  const [isCompleted, setIsCompleted] = useState(item.completed);

  const deleteItem = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await todoAgent.deleteTodo(item.id);
      await reFetch();
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const updateTodo = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await todoAgent.updateTodo(item.id, newMessage, isCompleted);
      await reFetch();
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isCompleted === item.completed && newMessage === item.message) return;
    let timeout = setTimeout(() => {
      updateTodo();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isCompleted, newMessage]);
  return (
    <div
      style={{
        backgroundColor: "gray",
        marginBottom: 20,
        display: "flex",
        gap: 15,
      }}
    >
      <button onClick={deleteItem}>
        Delete
        {isLoading && <ClipLoader size={10} />}
      </button>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <input
        type="checkbox"
        onChange={(e) => setIsCompleted(e.target.checked)}
        checked={isCompleted}
      />
    </div>
  );
};

export default TodoItem;
