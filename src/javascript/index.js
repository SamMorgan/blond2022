import '../sass/styles.scss';

import LazyLoad from "vanilla-lazyload";
import barba from '@barba/core';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper, { Lazy, Pagination, Navigation, Autoplay} from 'swiper';

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

const homePageScroll = () => {
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    // When the user is [modifier]px from the bottom, fire the event.
    let modifier = 10; 
    if(currentScroll + modifier > documentHeight) {
        document.body.classList.add('scrolled')
    }else{
        document.body.classList.remove('scrolled')
    }
}


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

const resizeVideos = (doc) => {
    const videos = doc.querySelectorAll('.vimeo-iframe')
    if(videos){
        videos.forEach(video => {
            fetch('//vimeo.com/api/oembed.json?url=' + video.src)
            .then((response) => response.json())
            .then((data) => {
                    video.setAttribute('height',data.height)
                    video.setAttribute('width',data.width)
                    video.style.aspectRatio = data.width/data.height
                    if(data.width < data.height){
                        video.classList.add('portrait')
                    }
                }
            )
        })
    }
}


// const customCursorFunc = (e) => {
//     customCursor(e)
// }



let scrollValues = {};

barba.init({
    debug:true,
    views: [
        {
            namespace: 'home',
            beforeEnter(data) {
                let homeSlideEl = data.next.container.querySelector('.home-slider')
                if(homeSlideEl){
                    let homeSlider = new Swiper(homeSlideEl, {
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

                document.addEventListener('scroll', homePageScroll) 

                if(!is_touch_enabled()){

                    let customCursorWrap
                    let customCursorEl

                    const customCursorOn = (e) => {
                        const mouseY = e.clientY;
                        const mouseX = e.clientX;
                    
                        // if(document.body.classList.contains('scrolled')){
                        //     customCursorEl.innerHTML = "click"
                        // }else{
                        //     customCursorEl.innerHTML = "scroll"
                        // }

                        console.log(e.target)
                        
                        customCursorEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                    }
                    const customCursorOff = (e) => {
                        customCursorEl.style.display = "none"
                        document.body.style.cursor = 'default'
                        e.target.removeEventListener('mousemove',customCursorOn)
                    }    
                    data.next.container.querySelectorAll('.custom-cursor-wrap').forEach(customCursorWrap => {
                        
                        customCursorWrap.addEventListener('mouseover',(e)=>{
                            // if(e.target.nodeName !== 'P'){
                            //     customCursorEl.style.display = "block"
                            //     document.body.style.cursor = 'none'

                            //     customCursorWrap.addEventListener('mousemove',customCursorOn)
                                
                            //     customCursorWrap.addEventListener('mouseleave',customCursorOff)
                            // }else{
                            //     customCursorOff()
                            // }
                            customCursorEl = customCursorWrap.querySelector('.custom-cursor')
                            customCursorEl.style.display = "block"
                            document.body.style.cursor = 'none'

                            customCursorWrap.addEventListener('mousemove',customCursorOn)

                            customCursorWrap.addEventListener('mouseleave',customCursorOff)
                        })
                        customCursorWrap.addEventListener('mouseleave',customCursorOff)
                    })    
                }
                let scrollDown = data.next.container.querySelector('.scrolldown')
                if(scrollDown){
                    scrollDown.addEventListener('click',()=>{
                        gsap.to(window,{
                            scrollTo: window.innerHeight, 
                            duration: 1
                        });
                    })
                }
                const spacer = () => {
                    data.next.container.querySelector('.intro').style.marginBottom = data.next.container.querySelector('.intro-text').getBoundingClientRect().height + "px"
                }
                spacer()
                window.addEventListener('resize',spacer)
                  
            },
            afterLeave() {    
                document.removeEventListener('scroll', homePageScroll) 
                window.removeEventListener('resize',spacer)
            }     
        },
        {
            namespace: 'work',
            beforeEnter(data) {
                window.addEventListener('scroll',secondaryNavScroll)
                secondaryNavClick(data.next.container.querySelector('.show-menu'))
            },
            afterLeave() {    
                window.removeEventListener('scroll',secondaryNavScroll) 
                document.body.classList.remove('show-secondary-header')
            } 
        }, 
        {
            namespace: 'single-work',
            beforeEnter(data) {
                window.addEventListener('scroll',secondaryNavScroll)
                secondaryNavClick(data.next.container.querySelector('.show-menu'))

                ScrollTrigger.create({
                    trigger: data.next.container.querySelector('.work-index'),
                    start: "top top",
                    end: "bottom bottom",
                    onEnter: () => {
                        data.next.container.querySelector('.single-work-header').classList.add('index-inview')
                    },
                    onEnterBack: () => {
                        data.next.container.querySelector('.single-work-header').classList.remove('index-inview')
                    }
                });
            },
            afterLeave() {    
                window.removeEventListener('scroll',secondaryNavScroll) 
                document.body.classList.remove('show-secondary-header')
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

                document.querySelectorAll(".info-section").forEach((section, i) => {
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
    let lazy = new LazyLoad({
        callback_loaded: (el) => {
            let wrap = el.parentElement.parentElement.parentElement
            if(wrap && wrap.classList.contains('work-card')){
                wrap.classList.add('animate-in')
                wrap.classList.remove('loading')
                setTimeout(()=>{
                    wrap.classList.remove('animate-in')
                },1000);
            }
            // if(el.tagName === 'IFRAME'){
            //     resizeVideos(el.parentElement)
            // }
        }
    })
}  
lazyImages()  

barba.hooks.beforeLeave((data) => {
    scrollValues[data.current.url.href] =  window.scrollY;
});

barba.hooks.beforeEnter((data) => {
    const scrollPos = scrollValues[data.next.url.href] ? scrollValues[data.next.url.href] : 0;
    document.documentElement.scrollTop = scrollPos;

    lazyImages()
});
