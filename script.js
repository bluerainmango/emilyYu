$('document').ready(function(){

  // sidenav init & hide
  $('.sidenav').sidenav();
  if($(window).width() > 992)
  $('.sidenav').attr('style','display:none;')

  $('.carousel').carousel();
  $('.collapsible').collapsible();


  // Header Animation

var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);



  
  /**********************************/
  /*            Side Nav            */
  /**********************************/

  // Slide in the fixed sidenav according to scrolling
  new Waypoint({
      element: document.querySelector('header'),
      handler: function(direction) {

        console.log('header goes: ', direction)
        
        if(direction==="down"){
          
          $('.sidenav').attr('style','display:block;').addClass('sidenav-fixed')

        }
        else{

          if($(window).width() > 992)
          $('.sidenav').attr('style','display:none;')

        }

      },
      offset: function(){
        return -this.element.clientHeight
      }
  })

  // Sidenav's Scroll Follower : Notifing which menu's page is being seen on the screen.
  const scrollFollowers = $('.scrollFollower');
 
        scrollFollowers.each((i,el) => {
            new Waypoint({
                element: el,
                handler: function(direction){
                            $('.currentMenu').removeClass('currentMenu')

                            // get nav menu class arr : [about, skill, project...] 
                            const navMenuClassArr = $('.menu').map( (i,el) => 
                                                          el.getAttribute('class').split(' ')[1] 
                                                          ).get();

                            if(direction === "down"){

                              console.log('scroll up' , i+1, navMenuClassArr[i+1]);
                              $(`.${navMenuClassArr[i+1]}`).addClass('currentMenu');

                            }
                            else{
                              
                              console.log('scroll up' , i, navMenuClassArr[i]);
                              $(`.${navMenuClassArr[i]}`).addClass('currentMenu');

                            }
                }
            });
        })
  
  // If menu clicked, close fixed sidenav
  $('.sidenav li, .sidenav li *').click(function(){
    $('.sidenav').sidenav('close'); 
  })


})
window.onload=function(){
  lax.setup() // init

  const updateLax = () => {
    lax.update(window.scrollY)
    window.requestAnimationFrame(updateLax)
  }
  
  window.requestAnimationFrame(updateLax)
  
}


