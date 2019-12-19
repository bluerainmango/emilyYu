$('document').ready(function(){

  // sidenav init & hide
  $('.sidenav').sidenav(); 
  $('.sidenav').attr('style','display:none;')



  $('.scrollspy').scrollSpy();

  // slide in fixed sidenav according to scrolling
  var sideNav = new Waypoint({
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

  // If menu clicked, close fixed sidenav
  $('.sidenav li, .sidenav li *').click(function(){
    $('.sidenav').sidenav('close'); 
  })

})

// window.onload = function() {
// 	lax.setup() // init

// 	const updateLax = () => {
// 		lax.update(window.scrollY)
// 		window.requestAnimationFrame(updateLax)
// 	}

// 	window.requestAnimationFrame(updateLax)
// }
