// Get DOM elements
const inputField = document.getElementById('inputField');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
const sortSelect = document.getElementById('sortSelect');
const filterSelect = document.getElementById('filterSelect');
const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');
const categorySelect = document.getElementById('categorySelect');

// Task data array
let tasks = [];

// Function to render tasks
function renderTasks() {
  todoList.innerHTML = '';

  const sortedTasks = tasks.slice();
  

  if (sortSelect.value === 'oldest') {
    sortedTasks.sort((a, b) => a.dueDate - b.dueDate);
  } else if (sortSelect.value === 'newest') {
    sortedTasks.sort((a, b) => b.dueDate - a.dueDate);
  }

  // Apply filtering based on select option
  const filteredTasks = sortedTasks.filter(task => {
    if (filterSelect.value === 'all') {
      return true;
    } else if (filterSelect.value === 'completed') {
      return task.completed;
    } else if (filterSelect.value === 'active') {
      return !task.completed;
    }
  });

  const searchQuery = searchField.value.toLowerCase();
  const searchedTasks = filteredTasks.filter(task => {
    return task.title.toLowerCase().includes(searchQuery);
  });

  searchedTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = 'item';
    taskItem.innerHTML = `
      <div class="content">
        <input type="text" class="text" value="${task.title}" readonly>
      </div>
      <div class="actions">
        <button class="btn btn-primary edit-button"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="btn btn-danger delete-button"><i class="fa-solid fa-trash-can"></i></button>
        <button class="btn btn-success complete-button">${task.completed ? 'Incomplete' : 'Complete'}</button>
      </div>
    `;

    // Attach event listeners to buttons within the task item
    const editButton = taskItem.querySelector('.edit-button');
    const deleteButton = taskItem.querySelector('.delete-button');
    const completeButton = taskItem.querySelector('.complete-button');

    editButton.addEventListener('click', () => {
      // Implement edit functionality here
    });

    deleteButton.addEventListener('click', () => {
      // Implement delete functionality here
    });

    completeButton.addEventListener('click', () => {
      // Implement complete functionality here
    });

    // todoList.appendChild(taskItem);
  });


  filteredTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = 'item';
    taskItem.innerHTML = `
      <div class="content">
        <input type="text" class="text" value="${task.title}" readonly>
      </div>
      <div class="actions">
        <button class="btn btn-primary edit-button"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="btn btn-danger delete-button"><i class="fa-solid fa-trash-can"></i></button>
        <button class="btn btn-success complete-button">${task.completed ? 'Incomplete' : 'Complete'}</button>
      </div>
    `;

    const editButton = taskItem.querySelector('.edit-button');
    const deleteButton = taskItem.querySelector('.delete-button');
    const completeButton = taskItem.querySelector('.complete-button');

    editButton.addEventListener('click', () => {
      // Implement edit functionality here
    });

    deleteButton.addEventListener('click', () => {
      // Implement delete functionality here
    });

    completeButton.addEventListener('click', () => {
      // Implement complete functionality here
    });

    todoList.appendChild(taskItem);
  });
}



searchButton.addEventListener('click', () => {
  // Get the search query from the search field
  const searchQuery = searchField.value.toLowerCase();

  // Find the searched task
  const searchedTask = tasks.find(task => task.title.toLowerCase() === searchQuery);

  // Clear the current task list
  todoList.innerHTML = '';

  // Display the searched task if found
  if (searchedTask) {
    const taskItem = createTaskItem(searchedTask);
    todoList.appendChild(taskItem);
  } else {
    // Display a message when the searched task is not found
    const messageItem = document.createElement('li');
    messageItem.textContent = 'Task not found.';
    todoList.appendChild(messageItem);
  }

  // Clear the search field
  searchField.value = '';
});


// Add task function
function addTask(title, category) {
  const task = {
    title: title,
    description: '', // Add description property
    dueDate: new Date(), // Add dueDate property
    category: category, // Add category property
    completed: false,
  };

  tasks.push(task);
  sessionStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Add button click event
addButton.addEventListener('click', () => {
  if (inputField.value.trim() !== '') {
    addTask(inputField.value, categorySelect.value);
    inputField.value = '';
  }
});

function createTaskItem(task) {
  const taskItem = document.createElement('li');
  taskItem.className = 'item';
  taskItem.innerHTML = `
    <div class="content">
      <input type="text" class="text" value="${task.title}" readonly>
    </div>
    <div class="actions">
      <button class="btn btn-primary edit-button"><i class="fa-regular fa-pen-to-square"></i></button>
      <button class="btn btn-danger delete-button"><i class="fa-solid fa-trash-can"></i></button>
      <button class="btn btn-success complete-button">${task.completed ? 'Incomplete' : 'Complete'}</button>
    </div>
  `;

  // Attach event listeners to buttons within the task item
  const editButton = taskItem.querySelector('.edit-button');
  const deleteButton = taskItem.querySelector('.delete-button');
  const completeButton = taskItem.querySelector('.complete-button');

  editButton.addEventListener('click', () => {
    // Implement edit functionality here
  });

  deleteButton.addEventListener('click', () => {
    // Implement delete functionality here
  });

  completeButton.addEventListener('click', () => {
    // Implement complete functionality here
  });

  return taskItem;
}

// Initial rendering
renderTasks();

// Edit task function
function editTask(index, newTitle) {
  tasks[index].title = newTitle;
  renderTasks();
}

// Delete task function
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Toggle completion status function
function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}


window.onload = () => {
  const storedTasks = JSON.parse(sessionStorage.getItem('tasks'));
  if (storedTasks) {
    tasks = storedTasks;
    renderTasks();
  }
};

// Add button click event



// Event delegation for edit, delete, and complete buttons
todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-button')) {
    const taskItem = event.target.closest('.item');
    const index = Array.from(todoList.children).indexOf(taskItem);
    const newTitle = prompt('Enter the new task title:', tasks[index].title);
    if (newTitle !== null) {
      editTask(index, newTitle);
    }
  } else if (event.target.classList.contains('delete-button')) {
    const taskItem = event.target.closest('.item');
    const index = Array.from(todoList.children).indexOf(taskItem);
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(index);
    }
  } else if (event.target.classList.contains('complete-button')) {
    const taskItem = event.target.closest('.item');
    const index = Array.from(todoList.children).indexOf(taskItem);
    toggleCompletion(index);
  }
});
// Function to sort tasks
function sortTasksBy(sortOption) {
  if (sortOption === 'dueDate') {
    tasks.sort((a, b) => a.dueDate - b.dueDate);
  }
  renderTasks();
}

// Function to filter tasks
function filterTasksBy(filterOption) {
  if (filterOption === 'completed') {
    const completedTasks = tasks.filter(task => task.completed);
    renderTasks(completedTasks);
  } else if (filterOption === 'active') {
    const activeTasks = tasks.filter(task => !task.completed);
    renderTasks(activeTasks);
  } else if (filterOption === 'all') {
    renderTasks(tasks); // Display all tasks
  }
}

// Sorting select change event
sortSelect.addEventListener('change', () => {
  sortTasksBy(sortSelect.value);
});

// Filtering select change event
// Filtering select change event
filterSelect.addEventListener('change', () => {
  filterTasksBy(filterSelect.value);
});


