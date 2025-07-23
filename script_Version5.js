const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Load tasks from localStorage
function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	tasks.forEach(({ text, done }) => {
		const li = createTaskElement(text, done);
		list.appendChild(li);
	});
}

// Save tasks to localStorage
function saveTasks() {
	const tasks = [];
	list.querySelectorAll('li').forEach(li => {
		tasks.push({
			text: li.querySelector('.task-text').textContent,
			done: li.classList.contains('done')
		});
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create a task <li> element
function createTaskElement(text, done = false) {
	const li = document.createElement('li');
	if (done) li.classList.add('done');
	li.tabIndex = 0;

	const span = document.createElement('span');
	span.textContent = text;
	span.className = 'task-text';
	span.contentEditable = false;
	li.appendChild(span);

	const edit = document.createElement('button');
	edit.textContent = '✏️';
	edit.className = 'edit-btn';
	edit.setAttribute('aria-label', 'Edit task');
	edit.addEventListener('click', (event) => {
		event.stopPropagation();
		span.contentEditable = !span.contentEditable;
		if (span.contentEditable) {
			edit.textContent = '💾';
			span.focus();
		} else {
			edit.textContent = '✏️';
			saveTasks();
		}
	});
	li.appendChild(edit);

	const del = document.createElement('button');
	del.textContent = '🗑️';
	del.className = 'delete-btn';
	del.setAttribute('aria-label', 'Delete task');
	del.addEventListener('click', (event) => {
		event.stopPropagation();
		li.remove();
		saveTasks();
	});
	li.appendChild(del);

	li.addEventListener('click', (event) => {
		// Only toggle done if clicking on li itself or .task-text
		if (event.target === li || event.target === span) {
			li.classList.toggle('done');
			saveTasks();
		}
	});
	li.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			li.classList.toggle('done');
			saveTasks();
		}
	});

	span.addEventListener('blur', () => {
		span.contentEditable = false;
		edit.textContent = '✏️';
		saveTasks();
	});

	return li;
}

form.addEventListener('submit', function (e) {
	e.preventDefault();
	const text = input.value.trim();
	if (!text) return;
	list.appendChild(createTaskElement(text));
	input.value = '';
	saveTasks();
});

window.addEventListener('DOMContentLoaded', loadTasks);