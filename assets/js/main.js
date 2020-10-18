/* 
This is shared javascript for the pages animations 
*/

/*====== RELLAX =====*/
var ellax = new Rellax('.rellax');

/*====== ANIMATE GSAP ======*/


/*Header*/
gsap.from('.header_title', {opacity:0, duration: 3, delay: 1.3, y: 35, ease:'expo.out'});
gsap.from('.header_button', {opacity:0, duration: 3, delay: 1.1 , y: 35, ease:'expo.out'});

/* Cards page - Modals */

gsap.from('.name-input', {opacity:0, duration: 3, delay: 1 , y: 35, ease:'expo.out'});
gsap.from('.popup', {opacity:0, duration: 3, delay: 1, y: 35, ease:'expo.out'});
gsap.from('.timeout-modal', {opacity:0, duration: 3, delay: 1, y: 35, ease:'expo.out'});

/*====== SCROLL REVEAL SECTION ======*/
const sr = ScrollReveal({
    duration: 2500,
    reset: true
});

sr.reveal('.rules_title',{distance: '70px'}); 
sr.reveal('.game-rules',{distance: '70px'}); 
sr.reveal('.lets-play',{distance: '70px'}); 
sr.reveal('.lets-play-btn',{distance: '70px'}); 
