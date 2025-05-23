const API_BASE_URL = 'http://localhost:8081/tasks';

function transformTaskForBackend(task) {
  return {
    title: task.title,
    description: task.description || null,
    dueDate: task.dueDate && task.dueDate.trim() !== '' ? task.dueDate : null,
    priority: task.priority ? task.priority.toUpperCase() : 'MEDIUM',
    subtasks: task.subtasks || []
  };
}

export async function getTasks() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function createTask(task) {
  try {
    const backendTask = transformTaskForBackend(task);
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendTask),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function getTaskSuggestions(task) {
  try {
    const backendTask = transformTaskForBackend(task);
    const response = await fetch(`${API_BASE_URL}/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendTask),
    });
    if (!response.ok) {
      throw new Error('Failed to get task suggestions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting task suggestions:', error);
    throw error;
  }
}

export async function updateTask(id, task) {
  try {
    const backendTask = transformTaskForBackend(task);
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendTask),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}
