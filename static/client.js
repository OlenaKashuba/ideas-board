function displayIdeas(ideas) {
	const ideasContainer = document.querySelector('.ideas-container');
	const ideasList = document.createElement('ol');
	ideas.forEach(function(idea) {
		const ideasListItem = document.createElement('li');
		ideasListItem.innerHTML = `
			<p>${idea.title}</p>
		`;
		ideasList.appendChild(ideasListItem);
	});
	ideasContainer.appendChild(ideasList);
};

fetch('/api/ideas')
	.then(function(response) {
		return response.json();
	})
	.then(displayIdeas)
	.catch(function(error) {
		return error;
	})
