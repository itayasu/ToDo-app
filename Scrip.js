const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	const text = input.value.trim();
	if (!text) return;

	const li = document.createElement('li');
	li.textContent = text;

	li.addEventListener('click', () => {
		li.classList.toggle('done');
	});

	const del = document.createElement('button');
	del.textContent = '🗑️';
	del.addEventListener('click', () => li.remove());

	li.appendChild(del);
	list.appendChild(li);
	input.value = '';
});
