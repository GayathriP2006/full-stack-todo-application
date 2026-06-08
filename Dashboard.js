import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:5000/tasks";

  const getTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;

    await axios.post(API, {
      title: title,
      completed: false,
    });

    setTitle("");
    getTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    getTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`${API}/${task._id}`, {
      completed: !task.completed,
    });

    getTasks();
  };
const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};
  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundImage: `
linear-gradient(
rgba(0,0,0,0.55),
rgba(0,0,0,0.55)
),
url('https://thf.bing.com/th/id/OIP.cLXLXOzqWYPD8AWWDoyI6wHaEK?o=7&cb=thfc1falcon2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3')
`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    }}
  >
    <div
      style={{
        width: "650px",
        maxWidth: "90%",
        padding: "30px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "25px",
          fontSize: "40px",
        }}
      >
        To-Do App
      </h1>
<button
  onClick={logout}
  style={{
    background: "#f44336",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    float: "right",
    cursor: "pointer"
  }}
>
  Logout
</button>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={addTask}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "12px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add
        </button>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.12)",
              color: "white",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
                color: task.completed
                  ? "#7CFC00"
                  : "white",
              }}
            >
              {task.title}
            </span>

            <div>
              <button
                onClick={() => toggleTask(task)}
                style={{
                  background: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 15px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                {task.completed ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 15px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}

export default Dashboard;