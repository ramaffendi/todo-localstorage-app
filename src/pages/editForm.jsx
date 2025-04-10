import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(stored);
    const currentTodo = stored.find((todo) => todo.id === parseInt(id));
    if (currentTodo) {
      setTask(currentTodo.text);
    } else {
      toast.error("Tugas tidak ditemukan!");
      navigate("/todos");
    }
  }, [id, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      toast.warning("Tugas tidak boleh kosong!");
      return;
    }

    const updated = todos.map((todo) =>
      todo.id === parseInt(id) ? { ...todo, text: task } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updated));
    toast.success("Tugas berhasil diperbarui!");
    setTimeout(() => navigate("/todos"), 1500); // navigasi setelah toast muncul
  };

  return (
    <div className="min-h-screen bg-blue-200 bg-no-repeat bg-cover bg-center flex flex-col items-center p-6 pt-10">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-xl font-semibold mb-4">Edit Tugas</h2>
      <form onSubmit={handleUpdate} className="w-full max-w-md flex gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Simpan
        </button>
      </form>
      <button
        onClick={() => navigate("/todos")}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        Kembali ke daftar
      </button>
    </div>
  );
}
