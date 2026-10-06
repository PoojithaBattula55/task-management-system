import { useState } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  );

  return (
    <div className="dashboard">

      <header className="topbar">
        <div>
          <h1>TaskFlow</h1>
          <p>Admin Dashboard</p>
        </div>

        <button onClick={logout}>Logout</button>
      </header>

      <main className="dashboard-content">

        <div className="welcome">
          <h2>Welcome, Admin 👋</h2>
          <p>
            Manage users and monitor tasks from one place.
          </p>
        </div>

        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>

          <div className="stat-card">
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h3>{completedTasks.length}</h3>
            <p>Completed Tasks</p>
          </div>

          <div className="stat-card">
            <h3>{pendingTasks.length}</h3>
            <p>Pending Tasks</p>
          </div>

        </div>

        {/* Users */}

        <section className="admin-section">

          <div className="admin-card">

            <h2>Registered Users</h2>

            {users.length === 0 ? (
              <p className="empty">
                No users registered yet.
              </p>
            ) : (
              users.map((user) => (
                <div className="admin-row" key={user.id}>

                  <div>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>

                </div>
              ))
            )}

          </div>

          {/* All Tasks */}

          <div className="admin-card">

            <h2>All Tasks</h2>

            {tasks.length === 0 ? (
              <p className="empty">
                No tasks available.
              </p>
            ) : (
              tasks.map((task) => (
                <div className="admin-row" key={task.id}>

                  <div>
                    <h3>{task.title}</h3>

                    <p>
                      Category: {task.category}
                    </p>

                    <p>
                      Deadline: {task.deadline}
                    </p>

                    <span
                      className={
                        task.status === "Completed"
                          ? "status completed"
                          : "status pending"
                      }
                    >
                      {task.status}
                    </span>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>

                </div>
              ))
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;