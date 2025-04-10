import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("todos", JSON.stringify(items));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      toast.warning("Tugas tidak boleh kosong!");
      return;
    }

    const updatedTodos = [
      ...todos,
      { id: Date.now(), text: task, completed: false },
    ];

    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
    setTask("");
    toast.success("Tugas berhasil ditambahkan!");
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
    toast.info("Status tugas diperbarui!");
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
    toast.error("Tugas berhasil dihapus!");
  };

  const goToEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-blue-200 bg-no-repeat bg-cover bg-center flex flex-col items-center px-4 py-8">
      <ToastContainer position="top-right" autoClose={1500} />

      <h1 className="text-3xl font-bold text-blue-600 mb-6">📋 To-Do List</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg bg-white p-4 rounded-xl shadow gap-3"
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tambah tugas..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Tambah
        </button>
      </form>

      <ul className="w-full max-w-6xl mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-2xl mb-3 transition-all"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="w-5 h-5"
              />
              <span
                className={`text-lg ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
            </div>
            <div className="flex gap-3 text-xl">
              <button
                onClick={() => goToEdit(todo.id)}
                className="text-blue-500 hover:scale-110"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:scale-110"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}

        {todos.length === 0 && (
          <div className="col-span-full flex justify-center items-center h-40">
            <p className="text-center text-gray-500 text-lg">
              Belum ada tugas. Yuk mulai tambah!
            </p>
          </div>
        )}
      </ul>
    </div>
  );
}
