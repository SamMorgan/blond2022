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


const workCardsFunc = () => {
    data.next.container.querySelectorAll('.work-card').forEach(workCard => {
        imagesLoaded( workCard, () => {
            workCard.classList.remove('loading')
            workCard.classList.add('anim-in')
            setTimeout(()=>{
                workCard.classList.remove('anim-in')
            },1000)
        })
    })
//     let lazy = new LazyLoad({
//         elements_selector: '.thumbnail',
//         callback_loaded: (el) => {
//             let workCard = el.parentElement.parentElement.parentElement
//             if(workCard && workCard.classList.contains('work-card')){
//                 workCard.classList.remove('loading')
//                 let confidential = false
//                 if(workCard.classList.contains('confidential')){
//                     confidential = true
//                 } 
                
//                 let img = workCard.querySelector('img')
//                 let c = document.createElement("canvas");
//                 let ctx = c.getContext('2d');

//                 c.width = img.width;
//                 c.height = img.height;

//                 //img.remove();
//                 //c.style.aspectRatio = c.width/c.height

//                 //const pxAdjust = () => {

//                     // let w = c.width/(sampleSize + 1)
//                     // let h = c.height/(sampleSize + 1)

//                     let w = 9
//                     let h = 6
//                     if(workCard.classList.contains('portrait')){
//                         w = 6
//                         h = 9
//                     }    
//                     ctx.drawImage(img, 0, 0, w, h);
//                     ctx.mozImageSmoothingEnabled    = false;
//                     ctx.oImageSmoothingEnabled      = false;
//                     ctx.webkitImageSmoothingEnabled = false;
//                     ctx.msImageSmoothingEnabled     = false;
//                     ctx.imageSmoothingEnabled       = false;
//                     ctx.drawImage(c, 0, 0, w, h, 0, 0, c.width, c.height);

//                     //ctx.drawImage(img, 0, 0, w, h);
//                     // ctx.mozImageSmoothingEnabled = false;
//                     // ctx.imageSmoothingEnabled = false;
//                     // c.width = w;
//                     // c.height = h;
//                     // ctx.mozImageSmoothingEnabled = false;
//                     // ctx.imageSmoothingEnabled = false;
//                     // ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
//                 //}

            
//                 //let ogSampleSize = confidential ? 70 : 140
//                 //let steps = ogSampleSize / 2
//                 //let steps = ogSampleSize
//                 //ctx.drawImage(img, 0, 0);

//                 //let sampleSize = ogSampleSize;

                

//                 workCard.querySelector('.thumbnail-wrap').appendChild(c);

//                 // let enterTimeout, leaveTimeout


//                 // const sharpenFunc = () => {
//                 //     clearTimeout(leaveTimeout)
//                 //     if(sampleSize !== 0){
//                 //         enterTimeout = setTimeout(()=>{
//                 //             sampleSize -= steps;
//                 //             pxAdjust()    
//                 //             if(sampleSize >= steps){
//                 //                 sharpenFunc()
//                 //             }
//                 //         },100) 
//                 //     } 
//                 // }

//                 // const pixelateFunc = () => {
//                 //     clearTimeout(enterTimeout)
//                 //     if(sampleSize < ogSampleSize){
//                 //         leaveTimeout = setTimeout(()=>{
//                 //             sampleSize += steps;
//                 //             pxAdjust()    
//                 //             if(sampleSize < ogSampleSize){
//                 //                 pixelateFunc()
//                 //             }
//                 //         },100) 
//                 //     } 
//                 // }

//                 // if(nameSpace === 'work'){
//                 //     if(confidential){
//                 //         workCard.addEventListener('mouseenter',sharpenFunc)
//                 //         workCard.addEventListener('mouseleave',pixelateFunc)
//                 //     }else{
//                 //         workCard.addEventListener('mouseenter',pixelateFunc)
//                 //         workCard.addEventListener('mouseleave',sharpenFunc)

//                 //         pxAdjust()
//                 //         setTimeout(()=>{
//                 //             sharpenFunc()
//                 //         },1000);
//                 //     }    
//                 // }else{
//                 //     workCard.addEventListener('mouseenter',sharpenFunc)
//                 //     workCard.addEventListener('mouseleave',pixelateFunc)

//                 //     pxAdjust()
//                 //     // setTimeout(()=>{
//                 //     //     sharpenFunc()
//                 //     // },1000);                    
//                 // }    

//             }
//         }
//     })
    
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

barba.init({
    debug:true,
    views: [
        {
            namespace: 'home',
            beforeEnter(data) {
                // let homeSlideEl = data.next.container.querySelector('.home-slider')
                // if(homeSlideEl){
                //     let homeSlider = new Swiper(homeSlideEl, {
                //         speed: 0,
                //         loop: true,

                //         lazy: {
                //             loadPrevNext: true,
                //         },
                //         navigation: {
                //             nextEl: ".swiper-button-next",
                //             prevEl: ".swiper-button-prev",
                //         }
                //     })  
                // }
                
                // let lazy = new LazyLoad({
                //     elements_selector: ".intro-image"
                // })

                // let video = data.next.container.querySelector('video')
                // let videoCanvas = data.next.container.querySelector("canvas")
                // let ctx = videoCanvas.getContext('2d')
                // let w
                // let h
                // let sampleSize = 30
                // let steps = sampleSize

                // const videoPxAdjust = () => {
                //     let cw = w/(sampleSize + 1)
                //     let ch = h/(sampleSize + 1)

                //     ctx.drawImage(video, 0, 0, cw, ch);
                //     ctx.mozImageSmoothingEnabled = false;
                //     ctx.imageSmoothingEnabled = false;
                //     ctx.drawImage(videoCanvas, 0, 0, cw, ch, 0, 0, w, h);                     
                // }
                // const sharpenVideoFunc = () => {
                //     setTimeout(()=>{
                //         sampleSize -= steps;
                //         videoPxAdjust()    
                //         if(sampleSize >= steps){
                //             sharpenVideoFunc()
                //         }else{
                //             //console.log(video.paused)
                //             videoCanvas.remove()
                //             video.play()
                //         }
                //     },100) 
                // }


                // const setupVideo = () => {
                //     w = video.videoWidth
                //     h = video.videoHeight

                //     if(h/w > window.innerHeight/window.innerWidth){
                //         video.parentElement.classList.add('max-height')
                //     }else{
                //         video.parentElement.classList.add('max-width')                       
                //     }

                //     videoCanvas.style.aspectRatio = w/h

                //     ctx.canvas.width = w;
                //     ctx.canvas.height = h;
                    
                //     // let cw = w/20
                //     // let ch = h/20

                //     // ctx.drawImage(video, 0, 0, cw, ch);
                //     // ctx.mozImageSmoothingEnabled = false;
                //     // ctx.imageSmoothingEnabled = false;
                //     // ctx.drawImage(videoCanvas, 0, 0, cw, ch, 0, 0, w, h); 
                //     videoPxAdjust()

                //     video.pause()
                    
                // } 
                // if(video.videoWidth > 0 && video.videoHeight > 0){
                //     setupVideo()
                // }else{
                //     video.addEventListener("loadeddata", () => {  

                //         // w = video.videoWidth
                //         // h = video.videoHeight
    
                //         // if(h/w > window.innerHeight/window.innerWidth){
                //         //     video.parentElement.classList.add('max-height')
                //         // }else{
                //         //     video.parentElement.classList.add('max-width')                       
                //         // }
    
                //         // videoCanvas.style.aspectRatio = w/h
    
                //         // ctx.canvas.width = w;
                //         // ctx.canvas.height = h;
                        
                //         // // let cw = w/20
                //         // // let ch = h/20
    
                //         // // ctx.drawImage(video, 0, 0, cw, ch);
                //         // // ctx.mozImageSmoothingEnabled = false;
                //         // // ctx.imageSmoothingEnabled = false;
                //         // // ctx.drawImage(videoCanvas, 0, 0, cw, ch, 0, 0, w, h); 
                //         // videoPxAdjust()
    
                //         // video.pause()
                //         setupVideo()
    
                //     },false) 
                // }           

                            


                //document.addEventListener('scroll', homePageScroll) 
                let introWrap = data.next.container.querySelector('.intro-wrap')
            
                introWrap.addEventListener('scroll',()=>{
                    let documentHeight = introWrap.scrollHeight;
                    let currentScroll = introWrap.scrollTop + window.innerHeight;
                    // When the user is [modifier]px from the bottom, fire the event.
                    let modifier = 10; 
                    if(currentScroll + modifier > documentHeight) {
                        document.body.classList.add('scrolled')

                        //sharpenVideoFunc() 
                        data.next.container.querySelector('video').play()
                    }
                    // else{
                    //     document.body.classList.remove('scrolled')
                    // }
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
                window.addEventListener('resize',spacer)
                  
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
                workCardsFunc('work')    
                document.body.classList.add('dark-bg')
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
            },
            afterLeave(data) {    
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

                workCardsFunc('work')

                ScrollTrigger.create({
                    trigger: workIndex,
                    start: "top center",
                    // end: "bottom bottom",
                    onEnter: () => {
                        //window.history.pushState({}, 'Work', data.next.container.querySelector('.main-header ul li:first-child a').href);
                        data.next.container.querySelector('.single-work-header').classList.add('index-inview')
                        //data.next.container.setAttribute('data-barba-namespace','work')
                        document.body.classList.add('dark-bg')
                        scrollStop(function () {
                            gsap.to(window,{
                                scrollTo: workIndex.offsetTop, 
                                duration: .5,
                                onComplete: ()=>{
                                    data.next.container.querySelector('.work-wrap').remove()
                                    window.scrollTo(0,0)
                                    workCardsFunc('work')
                                    data.next.container.querySelector('.main-header ul li:first-child').classList.add('current-menu-item')
                                    //barba.history.add(data.next.container.querySelector('.main-header ul li:first-child a').href,'Work');
                                    // setTimeout(()=>{
                                    //     window.history.pushState({}, 'Work', data.next.container.querySelector('.main-header ul li:first-child a').href);
                                    // },500)
                                    // simulateClick(data.next.container.querySelector('.main-header ul li:first-child a'))
                                }
                            })
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
            namespace: 'labs',
            beforeEnter(data) {
                //workCardsFunc('labs')
                document.body.classList.add('dark-bg')
            }
        }, 
        {
            namespace: 'single-labs',
            beforeEnter(data) {
                // ScrollTrigger.create({
                //     trigger: data.next.container.querySelector('.back-to-index'),
                //     start: "top center",
                //     onEnter: () => {
                //         simulateClick(data.next.container.querySelector('.main-header ul li:nth-child(2n) a'))
                //     }
                // });
                let workIndex = data.next.container.querySelector('.work-index')

                ScrollTrigger.create({
                    trigger: workIndex,
                    start: "top center",
                    onEnter: () => {
                        data.next.container.querySelector('.single-work-header').classList.add('index-inview')
                        document.body.classList.add('dark-bg')
                        scrollStop(function () {
                            gsap.to(window,{
                                scrollTo: workIndex.offsetTop, 
                                duration: .5,
                                onComplete: ()=>{
                                    data.next.container.querySelector('.work-wrap').remove()
                                    window.scrollTo(0,0)
                                    workCardsFunc('work')
                                    data.next.container.querySelector('.main-header ul li:nth-child(2n)').classList.add('current-menu-item')
                                }
                            })
                        })    
                    }
                });
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
    let lazy = new LazyLoad()
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

barba.hooks.afterLeave((data) => {
    if(data.next.namespace !== "labs" && data.next.namespace !== "work"){
        document.body.classList.remove('dark-bg')
    }
});
