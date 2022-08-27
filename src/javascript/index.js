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

                    let customCursorWrap = data.next.container.querySelector('.custom-cursor-wrap')
                    let customCursorEl = customCursorWrap.querySelector('.custom-cursor')
                    
                    customCursorWrap.addEventListener('mouseenter',()=>{
                        customCursorEl.style.display = "block"
                    })
                    
                    customCursorWrap.addEventListener('mousemove',(e)=>{
                        const mouseY = e.clientY;
                        const mouseX = e.clientX;
                    
                        if(document.body.classList.contains('scrolled')){
                            customCursorEl.innerHTML = "click"
                        }else{
                            customCursorEl.innerHTML = "scroll"
                        }
                        
                        customCursorEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                    })
                    
                    customCursorWrap.addEventListener('mouseleave',()=>{
                        customCursorEl.style.display = "none"
                    })
                }    
            },
            afterLeave() {    
                document.removeEventListener('scroll', homePageScroll) 
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

                if(!is_touch_enabled()){

                    let customCursorWrap = data.next.container.querySelector('.custom-cursor-wrap')
                    let customCursorEl = customCursorWrap.querySelector('.custom-cursor')
                    
                    customCursorWrap.addEventListener('mouseenter',()=>{
                        customCursorEl.style.display = "block"
                    })
                    
                    customCursorWrap.addEventListener('mousemove',(e)=>{
                        const mouseY = e.clientY;
                        const mouseX = e.clientX;
                        
                        customCursorEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                    })
                    
                    customCursorWrap.addEventListener('mouseleave',()=>{
                        customCursorEl.style.display = "none"
                    })
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
    ]
});


barba.hooks.beforeLeave((data) => {
    scrollValues[data.current.url.href] =  window.scrollY;
});

barba.hooks.beforeEnter((data) => {
    const scrollPos = scrollValues[data.next.url.href] ? scrollValues[data.next.url.href] : 0;
    document.documentElement.scrollTop = scrollPos;
});