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

function displayCards(cards) {
	const cardsContainer = document.querySelector('.cards-container');
	cards.forEach(function(item) {
		const cardItem = document.createElement('article');
		cardItem.setAttribute('class','card');
		cardItem.innerHTML = `
			<p>${item.title}</p>
			<img width="150" height="150" src="${item.pic_url}">
		`;
		console.log(cardItem);
	cardsContainer.appendChild(cardItem);
	});
}

fetch('/api/ideas')
	.then(function(response) {
		return response.json();
	})
	.then(displayIdeas)
	.then(displayCards)
	.catch(function(error) {
		return error;
	})

fetch('/api/ideas')
	.then(function(response) {
		return response.json();
	})
	.then(displayCards)
	.catch(function(error) {
		return error;
	})


