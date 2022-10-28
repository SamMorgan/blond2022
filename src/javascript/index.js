import '../sass/styles.scss';

//import LazyLoad from "vanilla-lazyload";
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


function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

const secondaryNavScroll = () => {
    if(window.scrollY > 10){
        document.body.classList.add('show-secondary-header')
    }else{
        document.body.classList.remove('show-secondary-header')
    }
}

const secondaryNavClick = (btn) => {
    if(btn){
        btn.addEventListener('click',()=>{
            document.body.classList.remove('show-secondary-header')
        })
    }    
}

const customCursorOnScroll = () => {
    const customCursorWrap = document.querySelector('.custom-cursor-wrap')
    const customCursorEl = document.querySelector('.custom-cursor')
    if(customCursorWrap && customCursorEl){
        let elRect = customCursorWrap.getBoundingClientRect()
        let cursorRect = customCursorEl.getBoundingClientRect()
        if(elRect.top > cursorRect.top || elRect.bottom < cursorRect.bottom){
            customCursorEl.style.visibility = "hidden"
            document.body.style.cursor = "default"
        }else{
            customCursorEl.style.visibility = "visible"
            document.body.style.cursor = "none"            
        }
    }
}
const moveCursor = (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    const customCursorEl = document.querySelector('.custom-cursor')
    customCursorEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
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

function indexMinHeight(e,doc = document){
    doc.querySelector('.work-index').style.minHeight = window.innerHeight - doc.querySelector('#contact').offsetHeight + 1 + 'px'
}


const workCardsFunc = (data) => {
    //console.log(data.next)
    let workCards = data.next.container.querySelectorAll('.work-card')
    //let workCards = document.querySelectorAll('.work-card')
    workCards.forEach(workCard => {
        imagesLoaded( workCard, () => {
            workCard.classList.remove('loading')
        })
    })

    if(ScrollTrigger.getById("workcards") !== undefined){
        ScrollTrigger.getById("workcards").kill()
    }
  
    //setTimeout(()=>{
        ScrollTrigger.batch(workCards, {
            id: "workcards",
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

    //},750)    
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

const spacer = () => {
    //data.next.container.querySelector('.intro').style.marginBottom = data.next.container.querySelector('.intro-text').getBoundingClientRect().height + "px"
    document.querySelector('.intro').style.marginBottom = document.querySelector('.intro-text').getBoundingClientRect().height + "px"
}

const setVideo = () => {
    let t = null;
    const video = document.querySelector('video')
    if(window.innerWidth < window.innerHeight){
        if(video.dataset.vmobile && video.src !== video.dataset.vmobile){
            if(t){ clearTimeout(t) }
            //video.pause()
            let ct = video.currentTime
            video.src = video.dataset.vmobile
            video.currentTime = ct
            t = setTimeout(()=>{
                video.play()
            },1000)
        }
    }else{
        if(video.src !== video.dataset.vdesktop){
            if(t){ clearTimeout(t) }
            //video.pause()
            let ct = video.currentTime
            video.src = video.dataset.vdesktop
            video.currentTime = ct
            t = setTimeout(()=>{
                video.play()
            },1000)
        }
    }
}

// var simulateClick = function (elem) {
// 	// Create our event (with options)
// 	var evt = new MouseEvent('click', {
// 		bubbles: true,
// 		cancelable: true,
// 		view: window
// 	});
// 	// If cancelled, don't dispatch our event
// 	var canceled = !elem.dispatchEvent(evt);
// };

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
            gsap.to(window,{
                scrollTo: 0, 
                duration: .5
            });   
        })
    })
}

const playVideos = (data) => {
    data.next.container.querySelectorAll('video[autoplay]').forEach((v)=>{
        v.play()
    })   
}

let workTitle = 'blond — Industrial Design and Product Design — Consultancy — Work'
let labsTitle = 'blond — Industrial Design and Product Design — Studio — Labs'


function defaultPageFunctions(data){
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
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            }
        })  
    }
    let customCursorWrap = data.next.container.querySelector('.custom-cursor-wrap')
    if(customCursorWrap && !is_touch_enabled()){
        let customCursorEl = customCursorWrap.querySelector('.custom-cursor')
        customCursorEl.style.display = "block"
        const customCursorOn = (e) => {
            document.body.style.cursor = "none"
            customCursorEl.style.visibility = "visible";
            customCursorWrap.addEventListener('mousemove',moveCursor)
        }
        const customCursorOff = (e) => {
            customCursorEl.style.visibility = "hidden"
            document.body.style.cursor = ""
            customCursorWrap.removeEventListener('mousemove',moveCursor)
        }    
        
        customCursorWrap.addEventListener('mouseover',customCursorOn)
        
        customCursorWrap.addEventListener('mouseleave',customCursorOff)

        window.addEventListener('scroll',customCursorOnScroll)
        //window.addEventListener('mousemove',moveCursor)
    }

    window.addEventListener('scroll',secondaryNavScroll)
    secondaryNavClick(data.next.container.querySelector('.show-menu'))
}

function backToIndex(data){
    let workIndex = data.next.container.querySelector('.work-index')
    let workWrap = data.next.container.querySelector('.work-wrap')
    let mainHeader = data.next.container.querySelector('.main-header')
    let secondaryHeader = data.next.container.querySelector('.secondary-header')
    let btn = data.next.container.querySelector('.main-header ul li:first-child')
    //let labsMenuBtn = data.next.container.querySelector('.main-header ul li:nth-child(2n)')

    if(data.next.container.dataset.barbaNamespace === 'single-labs'){
        btn = data.next.container.querySelector('.main-header ul li:nth-child(2n)')
    }
    btn.classList.add('current-menu-item')


    gsap.to([document.body, secondaryHeader, mainHeader],{
        scrollTrigger: {
            id: "changeColor",
            trigger: workIndex,
            start: "top bottom",
            end: "top top",
            scrub: true
        },
        backgroundColor: "#000000",
        color: "#DEDEDE"
    })

    ScrollTrigger.create({
        id: "backtowork",
        trigger: workIndex,
        start: "top top",
        // end: "bottom bottom",
        onEnter: () => {
            window.removeEventListener('scroll',secondaryNavScroll)
            document.body.classList.remove('show-secondary-header')
            scrollStop(function () {
                if(data.next.container.dataset.barbaNamespace === 'single-work' || data.next.container.dataset.barbaNamespace === 'single-labs' && workIndex.getBoundingClientRect().top <= 0){
                    let sPos = window.scrollY - workWrap.clientHeight
                    data.next.container.setAttribute('data-barba-namespace','work')
                    workWrap.remove()
                    let h1 = secondaryHeader.querySelector('h1')
                    let filters = secondaryHeader.querySelector('.filters')

                    gsap.to(h1,{opacity:0,duration:.4,onComplete:()=>{
                        h1.remove()
                        if(filters){
                            filters.style.display = "flex"
                            gsap.to(filters,{opacity:1,duration:.4,onComplete:()=>{
                                secondaryHeader.classList.remove('single-work-header')
                            }})
                        }    
                    }})
                    //setTimeout(()=>{
                    window.scrollTo(0,sPos) 
                    btn.classList.add('current-menu-item')
                    document.title = workTitle
                    window.history.pushState({}, 'work', btn.querySelector('a').href);
                    //},0)
                    workCardsFunc(data) 
                    ScrollTrigger.getById("changeColor").kill()
                    document.body.classList.add('dark-bg')
                    //document.body.removeAttribute('style')
                    let els = [document.body, secondaryHeader, mainHeader]
                    els.forEach(el => {
                        el.removeAttribute('style')
                    })
                    fadeInUp(data.next.container.querySelectorAll(".anim-fade-in-up"))
                }      
            },200)    
        }
    })
}

barba.init({
    //debug:true,
    views: [
        {
            namespace: 'home',
            beforeEnter(data) {
          
                //document.addEventListener('scroll', homePageScroll) 
                let introWrap = data.next.container.querySelector('.intro-wrap')
                let video = data.next.container.querySelector('video')
                let customCursorEl = data.next.container.querySelector('.custom-cursor')


                if(window.innerWidth < window.innerHeight && video.dataset.vmobile){
                    video.src = video.dataset.vmobile
                }else{
                    video.src = video.dataset.vdesktop
                }  
                window.addEventListener('resize',setVideo)
 
                video.addEventListener('loadedmetadata', function () {
                    video.pause()
                });
                // let lazyIntro = new LazyLoad({
                //     elements_selector: '.intro-img',
                //     callback_loaded: (el) => {
                //         el.parentElement.parentElement.classList.remove('loading')
                //     }
                // });

                    imagesLoaded( introWrap, () => {
                        introWrap.classList.remove('loading')
                    })
   
            
                introWrap.addEventListener('scroll',()=>{
                    let documentHeight = introWrap.scrollHeight;
                    let currentScroll = introWrap.scrollTop + window.innerHeight;
                    // When the user is [modifier]px from the bottom, fire the event.
                    let modifier = 10; 
                    if(currentScroll + modifier > documentHeight && !document.body.classList.contains('scrolled')) {
                        document.body.classList.add('scrolled')
                        
                        customCursorEl.remove()
                        introWrap.querySelector('.intro').remove()
                        introWrap.querySelector('img').remove()
                        document.body.style.cursor = 'auto'
                        video.play()
                    }
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
                        customCursorEl.style.display = "block"
                        document.body.style.cursor = 'none'
    
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

    
                data.next.container.querySelector('.intro').style.marginBottom = data.next.container.querySelector('.intro-text').getBoundingClientRect().height + "px"
                window.addEventListener('resize',spacer)
                  
            },
            afterLeave() {    
                window.removeEventListener('resize',spacer)
                window.removeEventListener('resize',setVideo)
                document.body.classList.remove('scrolled') 
            }     
        },
        {
            namespace: 'work',
            beforeEnter(data) {
                document.body.classList.add('dark-bg') 
                window.addEventListener('scroll',secondaryNavScroll)
                secondaryNavClick(data.next.container.querySelector('.show-menu'))
                   
                filterWork(data) 
                indexMinHeight(data.next.container)
                window.addEventListener('resize',indexMinHeight)
                workCardsFunc(data)
                
                workTitle = document.title
            },
            // afterEnter(data){
            //     workCardsFunc(data) 
            // },
            beforeLeave() {    
                window.removeEventListener('scroll',secondaryNavScroll) 
                document.body.classList.remove('show-secondary-header')  
                window.removeEventListener('resize',indexMinHeight)             
            } 
        }, 
        {
            namespace: 'single-work',
            beforeEnter(data) {
                window.scrollTo(0,0)
                document.body.classList.remove('dark-bg')
                window.addEventListener('scroll',secondaryNavScroll)
                secondaryNavClick(data.next.container.querySelector('.show-menu'))

                // let workIndex = data.next.container.querySelector('.work-index')
                // let workWrap = data.next.container.querySelector('.work-wrap')
                // let mainHeader = data.next.container.querySelector('.main-header')
                // let secondaryHeader = data.next.container.querySelector('.secondary-header')

                // let workMenuBtn = data.next.container.querySelector('.main-header ul li:first-child')

                // workMenuBtn.classList.add('current-menu-item')

                workCardsFunc(data) 
                filterWork(data) 
                indexMinHeight(data.next.container)
                window.addEventListener('resize',indexMinHeight)
                playVideos(data)
                backToIndex(data)
            },
            afterLeave() {    
                window.removeEventListener('scroll',secondaryNavScroll) 
                window.removeEventListener('resize',indexMinHeight) 
                document.body.classList.remove('show-secondary-header')
                document.body.removeAttribute('style')
                ScrollTrigger.getById("backtowork").kill()
                if(ScrollTrigger.getById("changeColor") !== undefined){
                    ScrollTrigger.getById("changeColor").kill()
                }
                if(ScrollTrigger.getById("workcards") !== undefined){
                    ScrollTrigger.getById("workcards").kill()
                }
            } 
        },
        {
            namespace: 'labs',
            beforeEnter(data) {
                workCardsFunc(data)
                document.body.classList.add('dark-bg')
                indexMinHeight(data.next.container)
                window.addEventListener('resize',indexMinHeight)
                labsTitle = document.title
            },
            // afterEnter(data){
            //     workCardsFunc(data) 
            // },
            beforeLeave(){
                window.removeEventListener('resize',indexMinHeight)
            }
        }, 
        {
            namespace: 'single-labs',
            beforeEnter(data) {
                document.body.classList.remove('dark-bg')
                window.addEventListener('scroll',secondaryNavScroll)
                secondaryNavClick(data.next.container.querySelector('.show-menu'))
                
                // let workIndex = data.next.container.querySelector('.work-index')
                // let workWrap = data.next.container.querySelector('.work-wrap')
                // let mainHeader = data.next.container.querySelector('.main-header')
                // let secondaryHeader = data.next.container.querySelector('.secondary-header')

                let labsMenuBtn = data.next.container.querySelector('.main-header ul li:nth-child(2n)')

                labsMenuBtn.classList.add('current-menu-item')

                workCardsFunc(data) 
                indexMinHeight(data.next.container)
                window.addEventListener('resize',indexMinHeight)
                playVideos(data)
                backToIndex(data)
            },
            beforeLeave(){
                window.removeEventListener('resize',indexMinHeight)
            },
            afterLeave() {    
                ScrollTrigger.getById("backtowork").kill()
                if(ScrollTrigger.getById("changeColor") !== undefined){
                    ScrollTrigger.getById("changeColor").kill()
                }
                if(ScrollTrigger.getById("workcards") !== undefined){
                    ScrollTrigger.getById("workcards").kill()
                }
            } 
        }, 
        {
            namespace: 'info',
            beforeEnter(data) {
                defaultPageFunctions(data)

                let navLinks = data.next.container.querySelectorAll(".scrollto-links a")
                if(navLinks){
                    navLinks.forEach((navLink)=>{
                        navLink.addEventListener("click", (e)=>{
                            e.preventDefault();
                            gsap.to(window,{
                                scrollTo: data.next.container.querySelector(navLink.getAttribute('href')).offsetTop, 
                                duration: 1
                            });
                        });  
                    })
                } 
                let infoSections = data.next.container.querySelectorAll(".info-section")
                if(infoSections){
                    infoSections.forEach((section, i) => {
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
                                data.next.container.querySelector('.scrollto-links a[href="#'+section.id+'"]').classList.add('active')
                            },
                            onEnterBack: () => {
                                let activeMenuItem = data.next.container.querySelector(".scrollto-links a.active")
                                if(activeMenuItem){
                                    activeMenuItem.classList.remove('active')
                                }
                                data.next.container.querySelector('.scrollto-links a[href="#'+section.id+'"]').classList.add('active')
                            }
                        });
                    });
                }    
            },
            afterLeave() {    
                window.removeEventListener('scroll',secondaryNavScroll) 
                if(!is_touch_enabled()){
                    window.removeEventListener('scroll',customCursorOnScroll)
                    window.removeEventListener('mousemove',moveCursor)
                }    
                document.body.classList.remove('show-secondary-header')
            } 
        },
        {
            namespace: 'default',
            beforeEnter(data) {
                defaultPageFunctions(data)
            },
            afterLeave() {    
                if(data.current.container.querySelector('.secondary-header')){
                    window.removeEventListener('scroll',secondaryNavScroll) 
                    document.body.classList.remove('show-secondary-header')
                }
            } 
        }

    ],
    transitions: [
        {
            sync: false,
            name: 'opacity-transition',
            leave(data) {
                return gsap.to([data.current.container.querySelector('main'),data.current.container.querySelector('footer')], { opacity: 0 });
            },
            afterLeave(data){
                //data.current.container.style.display = "none";
                data.current.container.querySelectorAll('main,footer').forEach(el=>{
                    el.style.display = 'none'
                })
            },   
            enter(data) {   
                window.scrollTo(0, 0);
                return gsap.from([data.current.container.querySelector('main'),data.current.container.querySelector('footer')], { opacity: 0 });
            }
        }, 
        {
            sync: false,
            name: 'back-to-home',
            to: { 
                namespace: ['home']
            },
            leave(data) {
                return gsap.to(data.current.container.querySelector('.work-index'), { opacity: 0 });
            }, 
            afterLeave(data){
                data.current.container.querySelectorAll('header,main,footer').forEach(el=>{
                    el.style.display = 'none'
                })
            },  
            enter(data) {
                return gsap.from(data.current.container.querySelector('.work-index'), { opacity: 0 });
            }
        },       
    ]
});



// const lazyImages = () => {
//     let lazy = new LazyLoad()
// }  
// lazyImages()  


// Parallax //
function fadeInUp(elems) {
    elems.forEach(function(elem) {

        gsap.set(elem, {
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    if(ScrollTrigger.getById("fadeinelems") !== undefined){
        ScrollTrigger.getById("fadeinelems").kill()
    }
    //setTimeout(()=>{
        ScrollTrigger.batch(elems, {
            id: "fadeinelems",
            onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),
            // onLeave: batch => gsap.to(batch, {opacity: 0, y: 24}),
            // onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),
            // onLeaveBack: batch => gsap.to(batch, {opacity: 0, y: 24}),
        
            //start: "top bottom",
            //end: "bottom 20%",
            //markers: true,
        });
    //},750)    
}

fadeInUp(document.querySelectorAll(".anim-fade-in-up"))

//workCardsFunc(document.querySelectorAll('.work-card'))

const subscribeForm = (form) => {
    //let form = data.next.container.querySelector('#mc-embedded-subscribe-form')
    if(form){
        
        let emailInput = form.querySelector('input[type="email"]') 
        emailInput.addEventListener('change',()=>{
            if(emailInput.value.length > 0){
                form.parentElement.classList.add('active')
            }
        })
        emailInput.addEventListener('focus',()=>{
            form.parentElement.classList.add('active')
        })
        emailInput.addEventListener('blur',()=>{
            if(emailInput.value.length === 0){
                form.parentElement.classList.remove('active')
            }
        })

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Check for spam
            //if(document.getElementById('js-validate-robot').value !== '') { return false }
            if(form.querySelector('.js-validate-robot').value !== '') { return false }

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
                //document.getElementById('js-subscribe-response').innerHTML = data.msg
                // console.log(data)
                // form.querySelector('.js-subscribe-response').innerHTML = data.msg
                if(data.result === "success"){
                    form.parentElement.classList.add('submitted') 
                    setTimeout(()=>{
                        form.parentElement.className = "newsletter"
                        form.reset();
                    },5000)
                }else{
                    alert(data.msg)
                }
            };
        });
    }
} 
document.querySelectorAll('.mc-embedded-subscribe-form').forEach(form=>{
    subscribeForm(form)
})

function fadeInImgs(doc){
    doc.querySelectorAll('.imgwrap img').forEach(img => {
        imagesLoaded( img.parentElement, () => {
            img.classList.add('loaded')
        })
    })
}
fadeInImgs(document)    


barba.hooks.beforeEnter((data) => {
    // let scrollPos = 0;
    // if(data.next.namespace !== "single-work" && data.next.namespace !== "single-labs"){
    //     scrollPos = scrollValues[data.next.url.href] ? scrollValues[data.next.url.href] : 0;
    // }
    // document.documentElement.scrollTop = scrollPos;
    if(data.next.namespace !== "work" && data.next.namespace !== "labs"){
        document.body.classList.remove('.dark-bg')
    } 
    document.body.removeAttribute('style')   

    //document.documentElement.scrollTop = 0  
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    //setTimeout(function () {
        window.scrollTo(0, 0);
    //},2);

    //lazyImages()

    fadeInUp(data.next.container.querySelectorAll(".anim-fade-in-up"))

    //workCardsFunc(data.next.container.querySelectorAll('.work-card'))

    data.next.container.querySelectorAll('.mc-embedded-subscribe-form').forEach(form=>{
        subscribeForm(form)
    })

    for(var c = data.next.container.getElementsByTagName("a"), a = 0;a < c.length;a++) {
        var b = c[a];
        b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank")
    }

    fadeInImgs(data.next.container)   

});


barba.hooks.afterLeave((data) => {
    if(data.next.namespace !== "labs" && data.next.namespace !== "work"){
        document.body.classList.remove('dark-bg')
    }
});
