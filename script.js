$('document').ready(function(){

/**********************************/
/*        Materialize init        */
/**********************************/

	// Sidenav init & hide
	$('.sidenav').sidenav();

	if($(window).width() > 992){
		$('.sidenav').attr('style','display:none;')
	}

	// carousel, collapsible init
	$('.carousel').carousel();
	$('.collapsible').collapsible();
	$('.tooltipped').tooltip();

/**********************************/
/*  			Side Nav - on/off   		*/
/**********************************/

	// Slide in the fixed sidenav according to scrolling
	new Waypoint({
			element: document.querySelector('header'),
			handler: function(direction) {
				
				if(direction==="down"){
					
					$('.sidenav').attr('style','display:block;').addClass('sidenav-fixed');

				}
				else{

					if( $(window).width() > 992 ){

						$('.sidenav').attr('style','display:none;');

					}
				}

			},
			offset: function(){
				return -this.element.clientHeight;
			}
	});

/**********************************/
/*  Side Nav - Scroll Follower    */
/* :Notifing which menu's content */ 
/*  is being seen on the screen. 	*/
/**********************************/

	const scrollFollowers = $('.scrollFollower');

	// SideNav menu class name arr : [about, skill, project...] 
	const navMenuClassArr = $('.menu').map( 
														function(i,el){ 
															return el.getAttribute('class').split(' ')[1];
														}).get();

	// Attach a scroll event to each section.
	scrollFollowers.each(function(i,el){

			return new Waypoint({
								element: el,
								handler: function(direction){

														$('.currentMenu').removeClass('currentMenu');
														let currentIndex;

														if(direction === "down"){
															
															// 992px = Top nav bar appearing point
															currentIndex = $(window).width() > 992 ? i : i+1;  
														}
														else if(direction === "up"){

															currentIndex = $(window).width() > 992 ? i-1 : i;	
														}

														$(`.${navMenuClassArr[currentIndex]}`).addClass('currentMenu');
								}
						});
	});
	
	// If a menu clicked, close the sidenav
	$('.sidenav li, .sidenav li *').click(function(){
		$('.sidenav').sidenav('close'); 
	});


/**********************************/
/*       Header animation   	    */
/**********************************/

const words = $('.word');
let wordArr = [];
let currentWordIndex = 0;

$(words[currentWordIndex]).css('opacity',1);

// Splite each words and add it to wordArr
for (let i = 0; i < words.length; i++) {
	splitLetters(words[i]);
}

changeWord();
setInterval(changeWord, 3000);


// Functions for animation

function changeWord() {

	const currentWord = wordArr[currentWordIndex];
	const nextWord = currentWordIndex === words.length-1 ? wordArr[0] : wordArr[currentWordIndex+1];
	
	// Take out current letters
	for (let i = 0; i < currentWord.length; i++) {
		animateLetterOut(currentWord, i);
	}
	
	// Take in next letters
	for (let i = 0; i < nextWord.length; i++) {

		$(nextWord[i]).attr('class', 'letter behind');
		$(nextWord[0]).parent().css('opacity', 1);
		animateLetterIn(nextWord, i);
	}

	// Move to next word
	currentWordIndex = (currentWordIndex === wordArr.length-1) ? 0 : currentWordIndex+1;
}

function animateLetterOut(currentWord, i) {

	setTimeout(function() {
		$(currentWord[i]).attr('class','letter out');
	}, i*80);
}

function animateLetterIn(nextWord, i) {

	setTimeout(function() {
		$(nextWord[i]).attr('class', 'letter in');
	}, 340+(i*80));
}

function splitLetters(word) {

	const content = $(word).text();

	$(word).text('');
	let letters = [];

	for (let i = 0; i < content.length; i++) {

		const $letter = $('<span>');
		$letter.addClass('letter').text(content.charAt(i));
		$(word).append($letter);
		letters.push($letter.get()[0]);
	}
	
	wordArr.push(letters);
}


/**********************************/
/*        Smooth scrolling        */
/**********************************/

$("a").on('click', function(event) {

	if (this.hash !== "") {

		event.preventDefault();

		var hash = this.hash;

		$('html, body').animate({ scrollTop: $(hash).offset().top }, 800, function(){

			// Add hash to URL when done scrolling
			window.location.hash = hash;

		});
	} 
});
		

});



