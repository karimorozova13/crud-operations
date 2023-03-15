import TodoItem from "@/components/TodoItem";
import axios from "axios";
import { useEffect, useState } from "react";
import todoAgent from "../utils/todoAgent";
import BeatLoader from "react-spinners/BeatLoader";

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [newMessgae, setNewMessgae] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isActive, setIsActive] = useState(null);
  const fetchData = async () => {
    const todos = await todoAgent.getTodoList();
    setTodo(todos);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const createTodo = async () => {
    setIsLoading(true);
    try {
      await todoAgent.createNewTodo(newMessgae);
      await fetchData();
      setNewMessgae("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {isLoading && <BeatLoader size={30} />}

      {todo.map((item, idx) => {
        return <TodoItem reFetch={fetchData} key={item.id} item={item} />;
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTodo();
        }}
      >
        <label>
          Message
          <input
            value={newMessgae}
            onChange={(e) => setNewMessgae(e.target.value)}
            type={"text"}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
