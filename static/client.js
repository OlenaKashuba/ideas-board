const selectedIdeasArray= []

function displayIdeas(ideas) {
	const ideasContainer = document.querySelector('.examples-container');
	const ideasList = document.createElement('ol');
	ideas.forEach(function(idea) {
		const ideasListItem = document.createElement('li');
		ideasListItem.innerHTML = `
			<span>${idea.title} 
				<button class="add-button"> Add </button>
			<span>
			
		`;
		ideasList.appendChild(ideasListItem);

	});
	ideasContainer.appendChild(ideasList);

	const addButtons = document.querySelectorAll('.add-button');
		addButtons.forEach(function(button) {
			button.addEventListener('click', function(e) {
				button.disabled = 'true';
				console.log(e.target.previousSibling.data.trim());
				return (e.target.previousSibling.data).trim();
				// selectedIdeasArray.push((e.target.previousSibling.data).trim());
				
				// console.log(selectedIdeasArray);
			});	
		});
};


function displayCards(cards) {
	fetch('/api/ideas-board')
	.then(function(response) {
		return response.json();
	})
	.then
	const cardsContainer = document.querySelector('.cards-container');
	cards.forEach(function(item) {
		const cardItem = document.createElement('article');
		cardItem.setAttribute('class','card');
		cardItem.innerHTML = `
			<p>${item.title}</p>
			<img width="150" height="150" src="${item.pic_url}">
		`;
	cardsContainer.appendChild(cardItem);
	});
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


