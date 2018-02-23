function displayIdeas(ideas) {
	const ideasContainer = document.querySelector('.examples-container');
	const ideasList = document.createElement('ol');
	ideas.forEach(function(idea) {
		const ideasListItem = document.createElement('li');
		ideasListItem.innerHTML = `
			<span>${idea.title}<span>
			<button class="add-button"> Add </button>
		`;
		ideasList.appendChild(ideasListItem);

	});
	ideasContainer.appendChild(ideasList);
	const addButton = document.querySelector('.add-button');
	addButton.addEventListener('click', function(event) {
 		debugger;
	});
};

fetch('/api/ideas')
	.then(function(response) {
		return response.json();
	})
	.then(displayIdeas)
	.catch(function(error) {
		return error;
	})

