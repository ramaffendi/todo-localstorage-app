import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoApp from "./pages/todoApps";
import Home from "./pages/home";
import EditForm from "./pages/editForm";

export default function App() {
  return (
    <Router basename="/todo-localstorage-app">
      <nav className="bg-[#198cb8] p-4 text-white flex justify-center gap-4">
        <Link
          to="/"
          className="hover:bg-blue-600 px-3 py-2 rounded transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/todos"
          className="hover:bg-blue-600 px-3 py-2 rounded transition duration-200"
        >
          To-Do
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<TodoApp />} />
        <Route path="/edit/:id" element={<EditForm />} />
      </Routes>
    </Router>
  );
}
