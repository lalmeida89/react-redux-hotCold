function trump(){
	$.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random", function(data, status){ 
		var words= data.message.split(' ')
		var longest = words.reduce(function (a, b) { return a.length > b.length ? a : b; });
		let promise = giphy('trump ' + longest);
		promise.done(function(d) {	
			checkPastQuotes(data.message, trump);
			checkPastGifs(d.data[0].embed_url, trump)	
			$('.donnyQuotes').html(`<h4>${data.message}</h4>`);
			let html = `<iframe src="${d.data[0].embed_url}" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`
		 	$('.don-gif').html(html); 
		});
	});
}

function ronSwanson () {
	$.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes", function(data, status){ 
 		var words= data[0].split(' ')
		var longest = words.reduce(function (a, b) { return a.length > b.length ? a : b; });
		let promise = giphy('parks and rec swanson ' + longest);
		promise.done(function(d) {		
			checkPastQuotes(data, ronSwanson);
			checkPastGifs(d.data[0].embed_url, ronSwanson)
			$('.ronQuotes').html(`<h4>${data}</h4>`);
			let html = `<iframe src="${d.data[0].embed_url}" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`
			$('.ron-gif').html(html)
		});
	});
}

function checkPastQuotes(data, callback) {
	if (pastQuotes.indexOf(data) > -1) {
		return callback();
	}
	else {
		pastQuotes.push(data);
		console.log(pastQuotes);
	}
}

function checkPastGifs(url, callback) {
	if (pastGifs.indexOf(url) > -1 ) {
		return callback();
	}
	else {
		pastGifs.push(url);
		console.log(pastGifs);
	}
}

let pastQuotes = []
let pastGifs =[]

function giphy (keyword) {
	return $.get(`https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=tQkrEE0TCEi8bePhpBak8YCoML9C7XX7&limit=1`, function(data, status){ 
	});
}

function getQuotes () {
	trump();
	ronSwanson();
}

let trumpTally = 0;
let swansonTally = 0;


$('#start-debate').click(function(e) {
	$('#quotesAndGifs').removeClass('hidden');
	$(this).addClass('hidden');
	$('.start-gifs').addClass('hidden');
	getQuotes();
});

$('.voteButton').click(function(e) {
	getQuotes();
});

$('#voteTrump.voteButton').click(function (e) {
	trumpTally++;
	$('.trumpScore p').html(`${trumpTally}`);
	let trumpWinner = `<img src='https://media.tenor.com/images/8cbb4d991cf9f7505b4396cc9455e1a4/tenor.gif'/>`
	if (trumpTally == 5) {
		finalPage();
		$('.js-results').removeClass('hidden');
		$('.js-results-gif').html(trumpWinner);
		$('.js-results-text').html(`<h3>You are a winner. The best winner. And I know winners. </h3>`);
		
	};	
});

$('#voteSwanson.voteButton').click(function (e) {
	swansonTally++;
	$('.swansonScore p').html(`${swansonTally}`);
	let swansonWinner = `<img src='https://www.reactiongifs.com/wp-content/uploads/2013/07/ron-moved.gif'/>`
	if (swansonTally == 5) {
		finalPage();
		$('.js-results').removeClass('hidden');
		$('.js-results-gif').html(swansonWinner);
		$('.js-results-text').html(`<h3>You have selected a true American Hero. Your nation is proud of you. </h3>`);
	};
});

function resetTally () {
	trumpTally = 0;
	swansonTally = 0;
	$('.trumpScore p, .swansonScore p').html(0);
}

function finalPage() {
	$('#quotesAndGifs').addClass('hidden');
	$('.start').addClass('hidden');
}

$('.restart-btn').click(function(e) {
	resetTally();
	$('#quotesAndGifs').removeClass('hidden');
	$('.js-results').addClass('hidden');
	$('.start').removeClass('hidden');

});
