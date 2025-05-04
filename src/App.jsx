import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast'
import './App.css'
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  // Load todos from localStorage on mount
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    try {
      if (todoString) {
        let savedTodos = JSON.parse(todoString);
        setTodos(savedTodos);
      } else {
        // If no todos in localStorage, initialize with an empty array
        setTodos([]);
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      setTodos([]); // Reset to empty array if there's an error
    }
  }, []);

  // Save todos to localStorage
  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggle = () => {
    console.log(showFinished)
    setshowFinished(!showFinished);
  };


  // Handle adding new todo
  const handleAdd = () => {
    if (todo.trim() === "") return; // Prevent adding empty todos

    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo(""); // Clear the input field after adding
    saveToLS(newTodos);
    toast.success("Event added")
  };

  // Handle edit
  const handleEdit = (e, id) => {
    let t = todos.find(item => item.id === id);
    setTodo(t.todo);

    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  // Handle delete
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
    toast.success("Event Deleted")
  };

  // Handle checkbox toggle
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(todo => todo.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted; // Toggle completed state
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  // Handle input change
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
    <Toaster  position="top-center" />
      <Navbar />
      <div className="container max-w-screen-lg mx-auto my-10 p-6 rounded-xl bg-violet-50 shadow-lg min-h-[70vh] px-6">

        <div className="addTodo mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-violet-700">Add a Todo</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={todo}
              onChange={handleChange}
              placeholder="Enter your task..."
              className="w-full px-4 py-2 border border-violet-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
            <button
              onClick={handleAdd}
              className="bg-violet-600 hover:bg-violet-800 px-4 py-2 text-white font-semibold rounded-lg transition duration-200 ease-in-out"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center m-5">
          <input
            className="mr-2"
            onChange={toggle}
            type="checkbox"
            checked={showFinished}
          />
          <h1>Show Finished</h1>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-violet-700">Your Todos</h1>
        <div className="todos space-y-4">
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
              <input
                type="checkbox"
                checked={item.isCompleted}
                className="mr-4 scale-125 accent-green-300"
                name={item.id}
                onChange={handleCheckbox}
              />
              <div className={`todo-text ${item.isCompleted ? "line-through text-gray-500" : "text-black"} font-semibold flex-grow`}>
                {item.todo}
              </div>
              <div className="buttons flex gap-2">
                <button
                  onClick={(e) => { handleEdit(e, item.id); }}
                  className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white rounded-lg font-medium transition duration-200 ease-in-out"
                >
                  <FaEdit/>
                </button>
                <button
                  onClick={(e) => { handleDelete(e, item.id); }}
                  className="bg-red-500 hover:bg-red-700 px-4 py-2 text-white rounded-lg font-medium transition duration-200 ease-in-out"
                >
                  <MdOutlineDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
