// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const errorMsg = document.getElementById('error-msg');
    const todoList = document.getElementById('todo-list');
    const counter = document.getElementById('counter');
  
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');
  
    // Active filter state tracking: 'all', 'active', 'done'
    let currentFilter = 'all';
  
    // Some Helper Functions
  
    // Recalculating the remaining items & applying current filter visibility
    function updateState() {
      const items = todoList.querySelectorAll('li');
      let activeCount = 0;
  
      items.forEach((li) => {
        const isCompleted = li.classList.contains('completed');
  
        // Counting uncompleted tasks
        if (!isCompleted) {
          activeCount++;
        }
  
        // Applying current filter visibility
        if (currentFilter === 'all') {
          li.classList.remove('hidden');
        } else if (currentFilter === 'active') {
          li.classList.toggle('hidden', isCompleted);
        } else if (currentFilter === 'done') {
          li.classList.toggle('hidden', !isCompleted);
        }
      });
  
      // Updating counter text
      const itemWord = activeCount === 1 ? 'item' : 'items';
      counter.textContent = `${activeCount} ${itemWord} left`;
    }
  
    // Form submission and item validation checker
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = todoInput.value.trim();
  
      // Check for empty submission
      if (taskText === '') {
        errorMsg.classList.remove('hidden');
        return;
      }
  
      // Don't show error message if valid response
      errorMsg.classList.add('hidden');
  
      // Create <li> structure matching requirements and style.css
      const li = document.createElement('li');
  
      const textSpan = document.createElement('span');
      textSpan.className = 'item-text';
      textSpan.textContent = taskText;
  
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
  
      li.appendChild(textSpan);
      li.appendChild(deleteBtn);
  
      // Appending to list & reset input field
      todoList.appendChild(li);
      todoInput.value = '';
  
      // Updating counter and filter visibility
      updateState();
    });
  
    // Event Delegation on #todo-list
    todoList.addEventListener('click', (e) => {
      const target = e.target;
  
      // Deleting item if delete button clicked
      if (target.classList.contains('delete-btn')) {
        const li = target.closest('li');
        if (li) {
          li.remove();
          updateState();
        }
        return;
      }
  
      // Toggle complete status if clicking item text or the li container
      const li = target.closest('li');
      if (li && todoList.contains(li)) {
        li.classList.toggle('completed');
        updateState();
      }
    });
  
    // Filters
    filterAll.addEventListener('click', () => {
      currentFilter = 'all';
      updateState();
    });
  
    filterActive.addEventListener('click', () => {
      currentFilter = 'active';
      updateState();
    });
  
    filterDone.addEventListener('click', () => {
      currentFilter = 'done';
      updateState();
    });
  });