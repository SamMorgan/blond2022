import '../sass/styles.scss';

import LazyLoad from "vanilla-lazyload";
import barba from '@barba/core';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper, { Lazy, Pagination, Navigation, Autoplay} from 'swiper';
//import imagesLoaded from "imagesloaded";

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

const spacer = (data) => {
    data.next.container.querySelector('.intro').style.marginBottom = data.next.container.querySelector('.intro-text').getBoundingClientRect().height + "px"
}

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
                
                // let lazy = new LazyLoad({
                //     elements_selector: ".intro-image"
                // })

                //document.addEventListener('scroll', homePageScroll) 
                let introWrap = data.next.container.querySelector('.intro-wrap')
                introWrap.addEventListener('scroll',(e)=>{
                    let documentHeight = introWrap.scrollHeight;
                    let currentScroll = introWrap.scrollTop + window.innerHeight;
                    // When the user is [modifier]px from the bottom, fire the event.
                    let modifier = 10; 
                    if(currentScroll + modifier > documentHeight) {
                        document.body.classList.add('scrolled')
                    }else{
                        document.body.classList.remove('scrolled')
                    }
                })

                if(!is_touch_enabled()){

                    let customCursorEl = data.next.container.querySelector('.custom-cursor')
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
                            customCursorOff()
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
                window.addEventListener('resize',spacer)
                  
            },
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

                let workIndex = data.next.container.querySelector('.work-index')

                ScrollTrigger.create({
                    trigger: workIndex,
                    start: "top center",
                    // end: "bottom bottom",
                    onEnter: () => {
                        data.next.container.querySelector('.single-work-header').classList.add('index-inview')
                        gsap.to(window,{
                            scrollTo: workIndex.offsetTop, 
                            duration: .5,
                            onComplete: ()=>{
                                data.next.container.querySelector('.work-wrap').remove()
                                window.scrollTo(0,0)
                            }
                        })
                    },
                    // onEnterBack: () => {
                    //     data.next.container.querySelector('.single-work-header').classList.remove('index-inview')
                    // }
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

                    ScrollTrigger.create({
                        trigger: section,
                        start: "top center",
                        //end: "bottom center",
                        //markers:true,
                        onEnter: () => {
                            gsap.to(window,{
                                scrollTo: section.offsetTop, 
                                duration: .5
                            });
                        },
                        // onEnterBack: () => {
                        //     console.log('enter back',section)
                        //     gsap.to(window,{
                        //         scrollTo: sectionRect.bottom, 
                        //         duration: .5
                        //     });
                        // }
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
            let workCard = el.parentElement.parentElement.parentElement
            if(workCard && workCard.classList.contains('work-card')){
                workCard.classList.remove('loading')
                
                setTimeout(()=>{
                    workCard.classList.add('loaded')
                },1000);

                const pxAdjust = () => {
                    ctx.drawImage(img, 0, 0);
                    let pixelArr = ctx.getImageData(0, 0, w, h).data;
                    if(sample_size > 0){
                        for (let y = 0; y < h; y += sample_size) {
                            for (let x = 0; x < w; x += sample_size) {
                                let p = (x + (y*w)) * 4;
                                ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
                                ctx.fillRect(x, y, sample_size, sample_size);
                            }
                        }
                    }                        
                }


                let img = workCard.querySelector('img')
                let c = document.createElement("canvas");
                let ctx = c.getContext('2d');
                img.remove();
            
                // let w = img1.width;
                // let h = img1.height;
                let w = img.width;
                let h = img.height;
            
                c.width = w;
                c.height = h;
                //ctx.drawImage(img1, 0, 0);

                let sample_size = 80;

                pxAdjust()

                workCard.querySelector('.thumbnail-wrap').appendChild(c);

                let enterTimeout, leaveTimeout


                const mouseEnterFunc = () => {
                    clearTimeout(leaveTimeout)
                    if(sample_size !== 0){
                        enterTimeout = setTimeout(()=>{
                            sample_size -= 10;
                            pxAdjust()    
                            if(sample_size >= 10){
                                mouseEnterFunc()
                            }
                        },100) 
                    } 
                }

                const mouseLeaveFunc = () => {
                    clearTimeout(enterTimeout)
                    if(sample_size < 80){
                        leaveTimeout = setTimeout(()=>{
                            sample_size += 10;
                            pxAdjust()    
                            if(sample_size < 80){
                                mouseLeaveFunc()
                            }
                        },100) 
                    } 
                }

                workCard.addEventListener('mouseenter',mouseEnterFunc)
                workCard.addEventListener('mouseleave',mouseLeaveFunc)

            }

            // if(el.tagName === 'IFRAME'){
            //     resizeVideos(el.parentElement)
            // }
        }
    })
    //let lazy = new LazyLoad()
}  
lazyImages()  


// Parallax //
function fadeInUp(elems) {
    elems.forEach(function(elem) {

        gsap.set(elems, {
            y: 100,
            opacity: 0,
        });

        ScrollTrigger.batch(elems, {
            onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),
            // onLeave: batch => gsap.to(batch, {opacity: 0, y: 24}),
            // onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),
            // onLeaveBack: batch => gsap.to(batch, {opacity: 0, y: 24}),
          
            start: "top 80%",
            end: "bottom 20%",
            //markers: true,
        });
    });
}

fadeInUp(document.querySelectorAll(".anim-fade-in-up"))

// const workCardsFunc = (workCards) => {
//     if(workCards){
//         workCards.forEach(workCard =>{
//             imagesLoaded( workCard, () => {
//                 workCard.classList.remove('loading')
                
//                 setTimeout(()=>{
//                     workCard.classList.add('loaded')
//                 },1000);

//                 const pxAdjust = () => {
//                     ctx.drawImage(img, 0, 0);
//                     let pixelArr = ctx.getImageData(0, 0, w, h).data;
//                     if(sample_size > 0){
//                         for (let y = 0; y < h; y += sample_size) {
//                             for (let x = 0; x < w; x += sample_size) {
//                                 let p = (x + (y*w)) * 4;
//                                 ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
//                                 ctx.fillRect(x, y, sample_size, sample_size);
//                             }
//                         }
//                     }                        
//                 }


//                 let img = workCard.querySelector('img')
//                 let c = document.createElement("canvas");
//                 let ctx = c.getContext('2d');
//                 img.remove();
            
//                 // let w = img1.width;
//                 // let h = img1.height;
//                 let w = img.width;
//                 let h = img.height;
            
//                 c.width = w;
//                 c.height = h;
//                 //ctx.drawImage(img1, 0, 0);

//                 let sample_size = 80;

//                 pxAdjust()

//                 workCard.querySelector('.thumbnail-wrap').appendChild(c);

//                 let enterTimeout, leaveTimeout


//                 const mouseEnterFunc = () => {
//                     clearTimeout(leaveTimeout)
//                     if(sample_size !== 0){
//                         enterTimeout = setTimeout(()=>{
//                             sample_size -= 10;
//                             pxAdjust()    
//                             if(sample_size >= 10){
//                                 mouseEnterFunc()
//                             }
//                         },100) 
//                     } 
//                 }

//                 const mouseLeaveFunc = () => {
//                     clearTimeout(enterTimeout)
//                     if(sample_size < 80){
//                         leaveTimeout = setTimeout(()=>{
//                             sample_size += 10;
//                             pxAdjust()    
//                             if(sample_size < 80){
//                                 mouseLeaveFunc()
//                             }
//                         },100) 
//                     } 
//                 }

//                 workCard.addEventListener('mouseenter',mouseEnterFunc)
//                 workCard.addEventListener('mouseleave',mouseLeaveFunc)
//             }) 
//         })

//         // gsap.set(workCards, {
//         //     y: 100,
//         //     opacity: 0,
//         // });

//         // ScrollTrigger.batch(workCards, {
//         //     onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),
//         //     // onLeave: batch => gsap.to(batch, {opacity: 0, y: 24}),
//         //     // onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),
//         //     // onLeaveBack: batch => gsap.to(batch, {opacity: 0, y: 24}),
          
//         //     start: "top 80%",
//         //     end: "bottom 20%",
//         //     //markers: true,
//         // });
//     }
// }
// workCardsFunc(document.querySelectorAll('.work-card'))

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

barba.hooks.beforeLeave((data) => {
    scrollValues[data.current.url.href] =  window.scrollY;
});

barba.hooks.beforeEnter((data) => {
    const scrollPos = scrollValues[data.next.url.href] ? scrollValues[data.next.url.href] : 0;
    document.documentElement.scrollTop = scrollPos;

    lazyImages()

    fadeInUp(data.next.container.querySelectorAll(".anim-fade-in-up"))

    workCardsFunc(data.next.container.querySelectorAll('.work-card'))

    subscribeForm(data.next.container.querySelector('#mc-embedded-subscribe-form'))

});
