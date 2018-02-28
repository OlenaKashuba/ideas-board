const selectedIdeasArray= []

function displayIdeas(ideas) {
	const ideasContainer = document.querySelector('.examples-container');
	const ideasList = document.createElement('ol');
	ideas.forEach(function(idea) {
		const ideasListItem = document.createElement('li');
		ideasListItem.innerHTML = `
			<span>${idea.title} 
				<button class="add-button" id="${idea.id}"> Add </button>
			<span>
			
		`;
		ideasList.appendChild(ideasListItem);

	});
	ideasContainer.appendChild(ideasList);

	const addButtons = document.querySelectorAll('.add-button');
		addButtons.forEach(function(button) {
			button.addEventListener('click', function(e) {
				const buttonId = e.target.id;
				fetch ('/api/ideas', {
					body: JSON.stringify({id: buttonId}),
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					}
				}) 
				.then (function()	{		
					button.disabled = 'true';
				})
			});	
		});
};


function displayCards(cards) {
	const cardsContainer = document.querySelector('.cards-container');
	if (cardsContainer === null) {
		return;
	}
	fetch('/api/ideas-board')
	.then(function(response) {
		return response.json();
	})
	.then (function() {
		cards.forEach(function(item) {
			const cardItem = document.createElement('article');
			cardItem.setAttribute('class','card');
			cardItem.innerHTML = `
				<p>${item.title}</p>
				<img width="150" height="150" src="${item.pic_url}">
			`;
		cardsContainer.appendChild(cardItem);
		});
	})
}

function displayList(ideas) {
	const listContainer = document.querySelector('.selected-ideas-list');
	ideas.forEach(function(idea) {
		const listItem = document.createElement('li');
		listItem.setAttribute('class', 'list-item');
		listItem.innerHTML =`
			<p>${item.title}</p>
		`;
		console.log(listItem);
		listContainer.appendChild(listItem);
		
	});
}

fetch('/api/ideas')
	.then(function(response) {
		return response.json();
	})
	.then(displayIdeas)
	.catch(function(error) {
		return error;
	})


fetch('/api/ideas-board')
	.then(function(response) {
		return response.json();
	})
	.then(displayCards)
	.catch(function(error) {
		return error;
	})


