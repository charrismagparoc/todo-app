import React, { useState, useEffect } from "react";
import "./ToDoList.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Update body class and localStorage when dark mode changes
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { title: newTask, description, completed: false }]);
      setNewTask("");
      setDescription("");
    }
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingTitle(tasks[index].title);
    setEditingDescription(tasks[index].description);
  };

  const saveEdit = () => {
    if (editingTitle.trim() !== "") {
      setTasks(
        tasks.map((task, i) =>
          i === editingIndex
            ? { ...task, title: editingTitle, description: editingDescription }
            : task
        )
      );
      setEditingIndex(null);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Filter tasks based on current filter and search
  const getFilteredTasks = () => {
    let filtered = tasks;
    
    // Apply search filter
    filtered = filtered.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    
    // Apply status filter
    if (filter === "completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (filter === "pending") {
      filtered = filtered.filter((task) => !task.completed);
    }
    
    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className={`todo-container ${darkMode ? "dark" : ""}`}>
      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        className={`theme-toggle ${darkMode ? "dark" : ""}`}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Input Fields */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Task subject"
        className="input-field"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="input-field"
      />
      <button onClick={addTask} className="add-button">
        + Add
      </button>

      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a task"
        className="search-bar"
      />

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button 
          onClick={() => setFilter("all")} 
          className={`filter-button ${filter === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter("completed")} 
          className={`filter-button ${filter === "completed" ? "active" : ""}`}
        >
          Completed
        </button>
        <button 
          onClick={() => setFilter("pending")} 
          className={`filter-button ${filter === "pending" ? "active" : ""}`}
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? "completed" : ""}`}>
            {editingIndex === index ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="input-field"
                />
                <textarea
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  className="input-field"
                />
                <div className="edit-buttons">
                  <button onClick={saveEdit} className="save-button">
                    Save
                  </button>
                  <button onClick={cancelEdit} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="task-info">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                    className="checkbox"
                  />
                  <div>
                    <p className="task-title">{task.title}</p>
                    {task.description && (
                      <p className="task-desc">{task.description}</p>
                    )}
                  </div>
                </div>
                <div className="task-actions">
                  <button 
                    onClick={() => startEditing(index)} 
                    className="edit-button"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => deleteTask(index)} 
                    className="delete-button"
                  >
                    🗑
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Task Counters */}
      <div className="task-counters">
        <div className="counter">
          Total tasks: <span>{tasks.length}</span>
        </div>
        <div className="counter">
          Completed: <span>{tasks.filter((t) => t.completed).length}</span>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;