import React from 'react';
import tasksData from './data/tasks.json'; // Importuj dane z pliku JSON
import './style/Categories.css'; // Importuj plik CSS

function TaskList() {
  return (
    <div>
      <div className="border-max">
        <h3 style={{ textAlign: 'center' }}>Task List</h3>
        <table id="tasks">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Items Collected</th>
              <th>Errors</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasksData.map((task, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even' : ''}>
                <td>{task.taskName}</td>
                <td>{task.category}</td>
                <td>{task.status}</td>
                <td>{task.itemsCollected}</td>
                <td>{task.errors}</td>
                <td>
                  <button className="button">Run</button>
                  <button className="button">Stop</button>
                  <button className="button">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
