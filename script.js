$('document').ready(function(){

  // sidenav init & hide
  $('.sidenav').sidenav();
  if($(window).width() > 992)
  $('.sidenav').attr('style','display:none;')

 



  
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

  // Sidenav's Scroll Follower : Notifing which menu is seen on the screen.
  const scrollFollowers = $('.scrollFollower');
 
        scrollFollowers.each((i,el) => {
            new Waypoint({
                element: el,
                handler: function(direction){
                            $('.currentMenu').removeClass('currentMenu')

                            if(direction === "down"){
                              console.log('scroll down' , i, el.id);
                              $(`.${el.id}`).addClass('currentMenu');
                            }
                            else{
                              // get nav menu class arr : [about, skill, project...] 
                              const navMenuClassArr = $('.menu').map( (i,el) => 
                                                          el.getAttribute('class').split(' ')[1] 
                                                          ).get();

                              console.log('scroll up' , i-1, navMenuClassArr[i-1]);
                              $(`.${navMenuClassArr[i-1]}`).addClass('currentMenu');
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

	  // gsap.to(".header__text", {rotation: 27, x: 100, duration: 1});

