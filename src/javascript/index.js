import '../sass/styles.scss';

import LazyLoad from "vanilla-lazyload";
import barba from '@barba/core';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper, { Lazy, Pagination, Navigation, Autoplay} from 'swiper';
import imagesLoaded from "imagesloaded";

Swiper.use([Lazy, Pagination, Navigation, Autoplay]);

//gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

//let lazy = new LazyLoad();

function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

// const homePageScroll = () => {
//     let documentHeight = document.body.scrollHeight;
//     let currentScroll = window.scrollY + window.innerHeight;
//     // When the user is [modifier]px from the bottom, fire the event.
//     let modifier = 10; 
//     if(currentScroll + modifier > documentHeight) {
//         document.body.classList.add('scrolled')
//     }else{
//         document.body.classList.remove('scrolled')
//     }
// }


const secondaryNavScroll = () => {
    if(window.scrollY > 10){
        document.body.classList.add('show-secondary-header')
    }else{
        document.body.classList.remove('show-secondary-header')
    }
}

const secondaryNavClick = (btn) => {
    btn.addEventListener('click',()=>{
        document.body.classList.remove('show-secondary-header')
    })
}

// const resizeVideos = (doc) => {
//     const videos = doc.querySelectorAll('.vimeo-iframe')
//     if(videos){
//         videos.forEach(video => {
//             fetch('//vimeo.com/api/oembed.json?url=' + video.src)
//             .then((response) => response.json())
//             .then((data) => {
//                     video.setAttribute('height',data.height)
//                     video.setAttribute('width',data.width)
//                     video.style.aspectRatio = data.width/data.height
//                     if(data.width < data.height){
//                         video.classList.add('portrait')
//                     }
//                 }
//             )
//         })
//     }
// }

function indexMinHeight(data){
    data.next.container.querySelector('.work-index').style.minHeight = window.innerHeight - data.next.container.querySelector('.site-footer').offsetHeight + 1 + 'px'
    window.addEventListener('load',()=>{
        data.next.container.querySelector('.work-index').style.minHeight = window.innerHeight - data.next.container.querySelector('.site-footer').offsetHeight + 1 + 'px'
    })
    window.addEventListener('resize',()=>{
        data.next.container.querySelector('.work-index').style.minHeight = window.innerHeight - data.next.container.querySelector('.site-footer').offsetHeight + 1 + 'px'
    })
}


const workCardsFunc = (data) => {
    data.next.container.querySelectorAll('.work-card').forEach(workCard => {
        imagesLoaded( workCard, () => {
            workCard.classList.remove('loading')
        })
    })
  
    ScrollTrigger.batch(".work-card", {
        onEnter: batch => { 
            //gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true})
            gsap.to(batch, {stagger: {
                each: 0.15, 
                grid: [1, 3],
                onComplete: function(){ 
                    this._targets.forEach(el => {
                        el.classList.remove('fade-in-up')
                    })
                }
            }, overwrite: true })
        },
        // onLeaveBack: batch => batch.forEach(el => {
        //     el.classList.add('fade-in-up')
        // })
    });    
}

/*!
 * Run a callback function after scrolling has stopped
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} callback The callback function to run after scrolling
 * @param  {Integer}  refresh  How long to wait between scroll events [optional]
 */
function scrollStop (callback, refresh = 66) {

	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

	// Setup scrolling variable
	let isScrolling;

	// Listen for scroll events
	window.addEventListener('scroll', function (event) {

		// Clear our timeout throughout the scroll
		window.clearTimeout(isScrolling);

		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(callback, refresh);

	}, false);

}



// const customCursorFunc = (e) => {
//     customCursor(e)
// }

const spacer = (data) => {
    data.next.container.querySelector('.intro').style.marginBottom = data.next.container.querySelector('.intro-text').getBoundingClientRect().height + "px"
}

var simulateClick = function (elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};

//let scrollValues = {};
const filterWork = (data) => {
    data.next.container.querySelectorAll('.filters a').forEach((filter)=>{
        filter.addEventListener('click',(e)=>{
            e.preventDefault()
            if(!filter.classList.contains('active')){
                data.next.container.querySelector('.filters a.active').classList.remove('active')
                filter.classList.add('active')
                window.history.pushState({}, '', filter.href);
                data.next.container.querySelectorAll('.work-card').forEach(workCard => {
                    if(filter.dataset.slug){
                        let cats = workCard.dataset.categories.split(',')
                        if(cats.includes(filter.dataset.slug)){
                            workCard.classList.remove('hidden')
                        }else{
                            workCard.classList.add('hidden')
                        }
                    }else{
                        workCard.classList.remove('hidden')
                    }    
                })
            }    
        })
    })
}



barba.init({
    debug:true,
    views: [
        {
            namespace: 'home',
            beforeEnter(data) {
          
                //document.addEventListener('scroll', homePageScroll) 
                let introWrap = data.next.container.querySelector('.intro-wrap')
                let video = data.next.container.querySelector('video')
                let customCursorEl = data.next.container.querySelector('.custom-cursor')
 
                // if (video.readyState >= video.HAVE_FUTURE_DATA) {
                // //     gsap.to(video,{opacity:1,duration:.4})
                //     alert('can play video')
                // } else {
                //     video.addEventListener('loadedmetadata', function () {
                //         //gsap.to(video,{opacity:1,duration:.4})
                //         alert('can play video')
                //     });
                // } 
                // alert('test') 
                
                // video.addEventListener('canplay', function () {
                //     //gsap.to(video,{opacity:1,duration:.4})
                //     video.pause()
                //     alert('can play video')
                // });
            
                introWrap.addEventListener('scroll',()=>{
                    let documentHeight = introWrap.scrollHeight;
                    let currentScroll = introWrap.scrollTop + window.innerHeight;
                    // When the user is [modifier]px from the bottom, fire the event.
                    let modifier = 10; 
                    if(currentScroll + modifier > documentHeight && !document.body.classList.contains('scrolled')) {
                        document.body.classList.add('scrolled')
                        
                        customCursorEl.remove()
                        introWrap.querySelector('.intro').remove()
                        //introWrap.querySelector('img').remove()
                        document.body.style.cursor = 'auto'
                        video.play()
                    }
                    // else{
                    //     document.body.classList.remove('scrolled')
                    // }
                })

                if(!is_touch_enabled()){

                    //let customCursorEl = data.next.container.querySelector('.custom-cursor')
                    let customCursorWrap = data.next.container.querySelector('.custom-cursor-wrap') 

                    const customCursorOn = (e) => {
                        const mouseY = e.clientY;
                        const mouseX = e.clientX;
                    
                        // if(document.body.classList.contains('scrolled')){
                        //     customCursorEl.innerHTML = "click"
                        // }else{
                        //     customCursorEl.innerHTML = "scroll"
                        // }
    
                        customCursorEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                    }
                    const customCursorOff = (e) => {
                        customCursorEl.style.display = "none"
                        document.body.style.cursor = 'default'
                        e.target.removeEventListener('mousemove',customCursorOn)
                    } 
                                              
                    customCursorWrap.addEventListener('mouseover',(e)=>{
                        if(e.target.classList.contains('intro-text') || e.target.nodeName === 'P' || e.target.nodeName === 'A'){
                            customCursorOff(e)
                        }else{
                            customCursorEl.style.display = "block"
                            document.body.style.cursor = 'none'

                            customCursorWrap.addEventListener('mousemove',customCursorOn)
                            
                            customCursorWrap.addEventListener('mouseleave',customCursorOff)
                        }
                        
                        customCursorEl.style.display = "block"
                        document.body.style.cursor = 'none'

                        customCursorWrap.addEventListener('mousemove',customCursorOn)

                        customCursorWrap.addEventListener('mouseleave',customCursorOff)
                    })
                    customCursorWrap.addEventListener('mouseleave',customCursorOff)
   
                }
                let scrollDown = data.next.container.querySelector('.scrolldown')
                if(scrollDown){
                    scrollDown.addEventListener('click',()=>{
                        gsap.to(introWrap,{
                            scrollTo: window.innerHeight, 
                            duration: 1
                        });
                    })
                }

                spacer(data)
                window.addEventListener('resize',spacer(data))
                  
            },
            // afterEnter(data) {    
            //     data.next.container.querySelector('video').onloadeddata = function() {
            //         console.log('loaded data funct')
            //     }; 
            // },
            afterLeave() {    
                //document.removeEventListener('scroll', homePageScroll) 
                window.removeEventListener('resize',spacer)
                document.body.classList.remove('scrolled')
            }     
        },
        {
            namespace: 'work',
            beforeEnter(data) {
                window.addEventListener('scroll',secondaryNavScroll)
                secondaryNavClick(data.next.container.querySelector('.show-menu'))
                workCardsFunc(data)    
                document.body.classList.add('dark-bg') 
                filterWork(data) 
                indexMinHeight(data)
                
                 
            },
            afterLeave(data) {    
                window.removeEventListener('scroll',secondaryNavScroll) 
                document.body.classList.remove('show-secondary-header')
            } 
        }, 
        {
            namespace: 'single-work',
            beforeEnter(data) {
                window.scrollTo(0,0)
                document.body.classList.remove('dark-bg')
                window.addEventListener('scroll',secondaryNavScroll)
                secondaryNavClick(data.next.container.querySelector('.show-menu'))

                let workIndex = data.next.container.querySelector('.work-index')
                let workWrap = data.next.container.querySelector('.work-wrap')

                let workMenuBtn = data.next.container.querySelector('.main-header ul li:first-child')

                workMenuBtn.classList.add('current-menu-item')

                workCardsFunc(data) 
                filterWork(data) 
                indexMinHeight(data)
                

                gsap.to(document.body,{
                    scrollTrigger: {
                        id: "changeColor",
                        trigger: workIndex,
                        start: "top bottom",
                        end: "top top",
                        scrub: true
                    },
                    backgroundColor: "#000",
                    color: "#DEDEDE"
                })

                ScrollTrigger.create({
                    id: "backtowork",
                    trigger: workIndex,
                    start: "top top",
                    // end: "bottom bottom",
                    onEnter: () => {
                        scrollStop(function () {
                            if(data.next.container.dataset.barbaNamespace === 'single-work'){
                                let sPos = window.scrollY - workWrap.clientHeight
                                data.next.container.setAttribute('data-barba-namespace','work')
                                workWrap.remove()
                                gsap.to(data.next.container.querySelector('.site-header.secondary-header h1'),{opacity:0,duration:.4,onComplete:()=>{
                                    data.next.container.querySelector('.site-header.secondary-header h1').remove()
                                    data.next.container.querySelector('.site-header.secondary-header .filters').style.display = "flex"
                                    gsap.to(data.next.container.querySelector('.site-header.secondary-header .filters'),{opacity:1,duration:.4,onComplete:()=>{
                                        data.next.container.querySelector('.site-header.secondary-header').classList.remove('single-work-header')
                                    }})
                                }})
                                //setTimeout(()=>{
                                window.scrollTo(0,sPos) 
                                workMenuBtn.classList.add('current-menu-item')
                                document.title = 'work | blond'
                                window.history.pushState({}, 'Work', workMenuBtn.querySelector('a').href);
                                //},0)
                                workCardsFunc(data) 
                                ScrollTrigger.getById("changeColor").kill()
                                document.body.classList.add('dark-bg')
                                document.body.removeAttribute('style')
                                fadeInUp(data.next.container.querySelectorAll(".anim-fade-in-up"))
                            }    
                        })    
                    }
                })
            },
            afterLeave() {    
                window.removeEventListener('scroll',secondaryNavScroll) 
                document.body.classList.remove('show-secondary-header')
                document.body.removeAttribute('style')
                ScrollTrigger.getById("backtowork").kill()
                if(ScrollTrigger.getById("changeColor") !== undefined){
                    ScrollTrigger.getById("changeColor").kill()
                }
            } 
        },
        {
            namespace: 'labs',
            beforeEnter(data) {
                workCardsFunc(data)
                document.body.classList.add('dark-bg')
                indexMinHeight(data)
                
            }
        }, 
        {
            namespace: 'single-labs',
            beforeEnter(data) {
                window.addEventListener('scroll',secondaryNavScroll)
                secondaryNavClick(data.next.container.querySelector('.show-menu'))
                
                let workIndex = data.next.container.querySelector('.work-index')

                let labsMenuBtn = data.next.container.querySelector('.main-header ul li:nth-child(2n)')

                labsMenuBtn.classList.add('current-menu-item')

                workCardsFunc(data) 
                indexMinHeight(data)
                


                gsap.to(document.body,{
                    scrollTrigger: {
                        id: "changeColor",
                        trigger: workIndex,
                        start: "top bottom",
                        end: "top top",
                        scrub: true
                    },
                    backgroundColor: "#000",
                    color: "#DEDEDE"
                })

                ScrollTrigger.create({
                    id: "backtowork",
                    trigger: workIndex,
                    start: "top top",
                    // end: "bottom bottom",
                    onEnter: () => {
                        scrollStop(function () {
                            if(data.next.container.dataset.barbaNamespace === 'single-labs'){
                                let sPos = window.scrollY - workWrap.clientHeight
                                data.next.container.setAttribute('data-barba-namespace','work')
                                workWrap.remove()
                                
                                window.removeEventListener('scroll',secondaryNavScroll)
                                document.body.classList.remove('show-secondary-header')
                                gsap.to(data.next.container.querySelector('.site-header.secondary-header'),{opacity:0,duration:.4,onComplete:()=>{
                                    data.next.container.querySelector('.site-header.secondary-header').remove()
                                    // data.next.container.querySelector('.site-header.secondary-header .filters').style.display = "flex"
                                    // gsap.to(data.next.container.querySelector('.site-header.secondary-header .filters'),{opacity:1,duration:.4,onComplete:()=>{
                                    //     data.next.container.querySelector('.site-header.secondary-header').classList.remove('single-work-header')
                                    // }})
                                }})

                                window.scrollTo(0,sPos) 
                                labsMenuBtn.classList.add('current-menu-item')
                                document.title = 'labs | blond'
                                window.history.pushState({}, 'Work', labsMenuBtn.querySelector('a').href);
                                workCardsFunc(data) 
                                ScrollTrigger.getById("changeColor").kill()
                                document.body.classList.add('dark-bg')
                                document.body.removeAttribute('style')
                            }    
                        })    
                    }
                })

                let workWrap = data.next.container.querySelector('.work-wrap')
                ScrollTrigger.create({
                    id: "backtowork",
                    trigger: workIndex,
                    start: "top top",
                    // end: "bottom bottom",
                    onEnter: () => {
                    document.body.classList.add('dark-bg')
                        scrollStop(function () {
                            if(data.next.container.dataset.barbaNamespace === 'single-labs'){
                                let sPos = window.scrollY - workWrap.clientHeight
                                data.next.container.setAttribute('data-barba-namespace','work')
                                workWrap.remove()
                                //setTimeout(()=>{
                                    window.scrollTo(0,sPos) 
                                    labsMenuBtn.classList.add('current-menu-item')
                                    document.title = 'labs | blond'
                                    window.history.pushState({}, 'Work', labsMenuBtn.querySelector('a').href);
                                //},0)
                                fadeInUp(data.next.container.querySelectorAll(".anim-fade-in-up"))
                            }    
                        })    
                    }
                })
            },
            afterLeave() {    
                ScrollTrigger.getById("backtowork").kill()
                //ScrollTrigger.getById("changeColor").kill()
            } 
        }, 
        {
            namespace: 'info',
            beforeEnter(data) {
                let headerSlideEl = data.next.container.querySelector('.info-slider')
                if(headerSlideEl){
                    let headerSlider = new Swiper(headerSlideEl, {
                        speed: 0,
                        loop: true,
                        lazy: {
                            loadPrevNext: true,
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }
                    })  
                }

                window.addEventListener('scroll',secondaryNavScroll)
                secondaryNavClick(data.next.container.querySelector('.show-menu'))

                let navLinks = data.next.container.querySelectorAll(".scrollto-links a")

                navLinks.forEach((navLink)=>{
                    navLink.addEventListener("click", (e)=>{
                        e.preventDefault();
                        gsap.to(window,{
                            scrollTo: data.next.container.querySelector(navLink.getAttribute('href')).offsetTop, 
                            duration: 1
                        });
                    });  
                })

                data.next.container.querySelectorAll(".info-section").forEach((section, i) => {
                    //let sectionRect = section.getBoundingClientRect()
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top center",
                        end: "bottom center",
                        onEnter: () => {
                            let activeMenuItem = data.next.container.querySelector(".scrollto-links a.active")
                            if(activeMenuItem){
                                activeMenuItem.classList.remove('active')
                            }
                            console.log("enter",section, section.id)
                            data.next.container.querySelector('.scrollto-links a[href="#'+section.id+'"]').classList.add('active')
                        },
                        onEnterBack: () => {
                            let activeMenuItem = data.next.container.querySelector(".scrollto-links a.active")
                            if(activeMenuItem){
                                activeMenuItem.classList.remove('active')
                            }
                            console.log("back",section, section.id)
                            data.next.container.querySelector('.scrollto-links a[href="#'+section.id+'"]').classList.add('active')
                        }
                    });
                });

                // if(!is_touch_enabled()){

                //     let customCursorWrap = data.next.container.querySelector('.custom-cursor-wrap')
                //     let customCursorEl = customCursorWrap.querySelector('.custom-cursor')
                    
                //     customCursorWrap.addEventListener('mouseenter',()=>{
                //         customCursorEl.style.display = "block"
                //     })
                    
                //     customCursorWrap.addEventListener('mousemove',(e)=>{
                //         const mouseY = e.clientY;
                //         const mouseX = e.clientX;
                        
                //         customCursorEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                //     })
                    
                //     customCursorWrap.addEventListener('mouseleave',()=>{
                //         customCursorEl.style.display = "none"
                //     })
                // }
                if(!is_touch_enabled()){

                    let customCursorWrap = data.next.container.querySelector('.custom-cursor-wrap')
                    let customCursorEl = customCursorWrap.querySelector('.custom-cursor')

                    const customCursorOn = (e) => {
                        const mouseY = e.clientY;
                        const mouseX = e.clientX;
                        document.body.style.cursor = "none"
                        customCursorEl.style.display = "block";
                        customCursorEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                        customCursorWrap.addEventListener('mousemove',customCursorOn)
                    }
                    const customCursorOff = (e) => {
                        customCursorEl.style.display = "none"
                        document.body.style.cursor = 'default'
                        customCursorWrap.removeEventListener('mousemove',customCursorOn)
                    }    
                    
                    customCursorWrap.addEventListener('mouseover',customCursorOn)
                    
                    customCursorWrap.addEventListener('mouseleave',customCursorOff)
                }
            },
            afterLeave() {    
                window.removeEventListener('scroll',secondaryNavScroll) 
                document.body.classList.remove('show-secondary-header')
            } 
        }          
    ],
    transitions: [
        {
            sync: false,
            name: 'opacity-transition',
            leave(data) {
                return gsap.to(data.current.container, { opacity: 0 });
            },
            afterLeave(data){
                data.current.container.style.display = "none";
            },   
            enter(data) {   
                return gsap.from(data.next.container, { opacity: 0 });
            }
        }, 
        {
            sync: false,
            name: 'work-filtering',
            from: { 
                namespace: ['work']
            },
            to: { 
                namespace: ['work']
            },
            leave(data) {
                return gsap.to(data.current.container.querySelector('.work-index'), { opacity: 0 });
            }, 
            afterLeave(data){
                data.current.container.style.display = "none";
                document.body.classList.add('show-secondary-header')
                //document.body.classList.remove('show-secondary-header')
            },  
            enter(data) {
                return gsap.from(data.current.container.querySelector('.work-index'), { opacity: 0 });
            }
        },       
    ]
});



const lazyImages = () => {
    let lazy = new LazyLoad()
}  
lazyImages()  


// Parallax //
function fadeInUp(elems) {
    elems.forEach(function(elem) {

        gsap.set(elems, {
            y: 50,
            opacity: 0,
            duration: 1
        });

        ScrollTrigger.batch(elems, {
            onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),
            // onLeave: batch => gsap.to(batch, {opacity: 0, y: 24}),
            // onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),
            // onLeaveBack: batch => gsap.to(batch, {opacity: 0, y: 24}),
          
            start: "top bottom",
            //end: "bottom 20%",
            //markers: true,
        });
    });
}

fadeInUp(document.querySelectorAll(".anim-fade-in-up"))

//workCardsFunc(document.querySelectorAll('.work-card'))

const subscribeForm = (form) => {
    //let form = data.next.container.querySelector('#mc-embedded-subscribe-form')
    if(form){
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Check for spam
            if(document.getElementById('js-validate-robot').value !== '') { return false }

            // Get url for mailchimp
            var url = this.action.replace('/post?', '/post-json?');

            // Add form data to object
            var data = '';
            var inputs = this.querySelectorAll('input');
            for (var i = 0; i < inputs.length; i++) {
                data += '&' + inputs[i].name + '=' + encodeURIComponent(inputs[i].value);
            }

            // Create & add post script to the DOM
            var script = document.createElement('script');
            script.src = url + data;
            document.body.appendChild(script);

            // Callback function
            var callback = 'callback';
            window[callback] = function(data) {

                // Remove post script from the DOM
                delete window[callback];
                document.body.removeChild(script);

                // Display response message
                document.getElementById('js-subscribe-response').innerHTML = data.msg
            };
        });
    }
} 
subscribeForm(document.querySelector('#mc-embedded-subscribe-form'))




barba.hooks.beforeEnter((data) => {
    // let scrollPos = 0;
    // if(data.next.namespace !== "single-work" && data.next.namespace !== "single-labs"){
    //     scrollPos = scrollValues[data.next.url.href] ? scrollValues[data.next.url.href] : 0;
    // }
    // document.documentElement.scrollTop = scrollPos;

    //document.documentElement.scrollTop = 0  
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0,0); 

    lazyImages()

    fadeInUp(data.next.container.querySelectorAll(".anim-fade-in-up"))

    //workCardsFunc(data.next.container.querySelectorAll('.work-card'))

    subscribeForm(data.next.container.querySelector('#mc-embedded-subscribe-form'))

});

// barba.hooks.beforeEnter(() => {
//     window.scrollTo(0,0); 
// });

barba.hooks.afterLeave((data) => {
    if(data.next.namespace !== "labs" && data.next.namespace !== "work"){
        document.body.classList.remove('dark-bg')
    }
});
