import { useState } from "react";

function UserDashboard() {
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Study");
  const [deadline, setDeadline] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Add or Update Task
  const saveTask = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingId
          ? {
              ...task,
              title: title,
              category: category,
              deadline: deadline
            }
          : task
      );

      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      alert("Task updated successfully!");

      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: title,
        category: category,
        deadline: deadline,
        status: "Pending",
        user: loggedInUser.email
      };

      const updatedTasks = [...tasks, newTask];

      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      alert("Task added successfully!");
    }

    setTitle("");
    setCategory("Study");
    setDeadline("");
  };

  // Edit Task
  const editTask = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setCategory(task.category);
    setDeadline(task.deadline);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setCategory("Study");
    setDeadline("");
  };

  // Complete Task
  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: "Completed"
          }
        : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Delete Task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  // Deadline Status
  const getDeadlineStatus = (task) => {
    if (task.status === "Completed") {
      return {
        text: "Completed",
        className: "completed"
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(task.deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    const difference =
      (deadlineDate - today) /
      (1000 * 60 * 60 * 24);

    if (difference < 0) {
      return {
        text: "Overdue",
        className: "overdue"
      };
    }

    if (difference === 0) {
      return {
        text: "Due Today",
        className: "due-today"
      };
    }

    if (difference <= 2) {
      return {
        text: "Due Soon",
        className: "due-soon"
      };
    }

    return {
      text: "Upcoming",
      className: "upcoming"
    };
  };

  // Current user's tasks
  const userTasks = tasks.filter(
    (task) => task.user === loggedInUser?.email
  );

  // Search tasks
  const searchedTasks = userTasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Completed tasks
  const completedTasks = userTasks.filter(
    (task) => task.status === "Completed"
  );

  // Pending tasks
  const pendingTasks = userTasks.filter(
    (task) => task.status === "Pending"
  );

  // Progress
  const progress =
    userTasks.length > 0
      ? Math.round(
          (completedTasks.length / userTasks.length) * 100
        )
      : 0;

  return (
    <div className="dashboard">

      {/* Header */}

      <header className="topbar">

        <div>
          <h1>TaskFlow</h1>
          <p>User Dashboard</p>
        </div>

        <button onClick={logout}>
          Logout
        </button>

      </header>


      <main className="dashboard-content">

        {/* Welcome */}

        <div className="welcome">

          <h2>
            Welcome, {loggedInUser?.name}! 👋
          </h2>

          <p>
            Organize your tasks and stay productive.
          </p>

        </div>


        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">
            <h3>{userTasks.length}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h3>{completedTasks.length}</h3>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h3>{pendingTasks.length}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>{progress}%</h3>
            <p>Progress</p>
          </div>

        </div>


        {/* Progress Bar */}

        <div className="progress-box">

          <div className="progress-header">

            <h3>Overall Progress</h3>

            <span>{progress}%</span>

          </div>

          <div className="progress-track">

            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>

          </div>

        </div>


        {/* Task Section */}

        <section className="task-section">


          {/* Add / Edit Task */}

          <div className="task-form">

            <h2>
              {editingId !== null
                ? "Edit Task"
                : "Add New Task"}
            </h2>

            <form onSubmit={saveTask}>

              <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >

                <option value="Study">
                  Study
                </option>

                <option value="Work">
                  Work
                </option>

                <option value="Personal">
                  Personal
                </option>

                <option value="Project">
                  Project
                </option>

              </select>

              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />

              <button type="submit">
                {editingId !== null
                  ? "Update Task"
                  : "Add Task"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}

            </form>

          </div>


          {/* Task List */}

          <div className="task-list">

            <div className="task-list-header">

              <h2>My Tasks</h2>

              <input
                type="text"
                className="search-input"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>


            {searchedTasks.length === 0 ? (

              <p className="empty">

                {searchTerm
                  ? "No matching tasks found."
                  : "No tasks added yet."}

              </p>

            ) : (

              searchedTasks.map((task) => {

                const deadlineStatus =
                  getDeadlineStatus(task);

                return (

                  <div
                    className="task-card"
                    key={task.id}
                  >

                    <div>

                      <h3>{task.title}</h3>

                      <p>
                        Category:{" "}
                        <strong>{task.category}</strong>
                      </p>

                      <p>
                        Deadline: {task.deadline}
                      </p>

                      <span
                        className={`status ${deadlineStatus.className}`}
                      >
                        {deadlineStatus.text}
                      </span>

                    </div>


                    <div className="task-actions">

                      {task.status !== "Completed" && (
                        <button
                          onClick={() => completeTask(task.id)}
                        >
                          Complete
                        </button>
                      )}

                      <button
                        className="edit-btn"
                        onClick={() => editTask(task)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                );
              })

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default UserDashboard;