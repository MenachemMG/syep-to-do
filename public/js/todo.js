$(document).ready(function() {
	$.getJSON('/tasks', function(data) {
		displayTasks(data);
		//$('li').click(toggleTask);
	});
	$('ul').on('click', 'li', toggleTask);
	$('ul').on('click', '.delete', deleteTask);
	$('#newtask').submit(addTask);
});

function addTask() {
	$.ajax({
		type: "POST",
		url: "/tasks",
		data: JSON.stringify({task: $('#task').val()}),
		success: displayTasks,
		contentType: 'application/json'
	});
	$('#task').val('');
	return false;
}

function displayTasks(tasks) {
	$('#todos').html('');
	$.each(tasks, function(key, value) {
		$('#todos').append(displayTask(key, value));
	});
}

function toggleTask() {
	var url = '/tasks/' + $(this).data('task');
	$.post(url, function(data) {
		displayTasks(data);
	});
}

function displayTask(key, value) {
	return '<li class="list-group-item" data-complete="' + value.status +
		'" data-task="' + key + '">' + value.task +
		'<span class="delete">X</span></li>';
}

function deleteTask(event) {
	//console.log(event);
	event.stopPropagation();
	let url = '/tasks/' + $(this).parent().data('task');
	$.ajax({
		type: "DELETE",
		url: url,
		success: displayTasks
	});
}