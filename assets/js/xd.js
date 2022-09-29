gsap.registerPlugin(Flip, ScrollTrigger, ScrollSmoother);

let isOnDisplay = false;
let descriptionText = document.querySelectorAll("div#descriptionText > *");
let smoother = ScrollSmoother.create({
   wrapper: "#smooth-wrapper",
   content: "#smooth-content",
   smooth: 1.65,
   effects: true
});

// ID/lag assigning
let imgs = document.querySelectorAll("div#images > img");
for(let i = 0; i < imgs.length; i++) {
   let img = imgs[i];
   img.id = i;
}
// Event handling stuff
$("img").hover(e => {
   if(!isOnDisplay) {
      gsap.to(e.target, {
         duration: 0.35,
         scale: 0.9,
         ease: "power3"
      });
   }
}).click(e => {
   if(!isOnDisplay) {
      isOnDisplay = true;
      let state = Flip.getState(e.target);
      $(e.target).css({
         position: "fixed",
         width: "90%",
         top: 0,
         left: 0,
         zIndex: 2
      }).appendTo("body");
      Flip.from(state, {
         duration: 1.25,
         ease: "power4.inOut"
      });
      gsap.to(e.target, {
         duration: 0.625,
         scale: 0.65,
         rotation: 10,
         ease: "power4.in",
         onComplete: () => {
            gsap.to(e.target, {
               duration: 0.625,
               scale: 1,
               ease: "power4.out",
               rotation: 0,
               overwrite: "auto"
            });
         }
      });
      gsap.to(descriptionText, {duration: 0.75, opacity: 1, delay: 0.75, stagger: 0.15, ease: "power3"});
      switch(e.target.id) {
         case "0":
            descriptionText[0].textContent = "Endless Wildlife";
            descriptionText[1].innerHTML = "a large, beautiful landscape full of life and serenity — <a href='https://unsplash.com/photos/NRQV-hBF10M' target='_blank'>https://unsplash.com/photos/NRQV-hBF10M</a>";
            break;
         case "1":
            descriptionText[0].textContent = "Computer Desk";
            descriptionText[1].innerHTML = "a cute white desk with some expensive stuff on top — <a href='https://unsplash.com/photos/aZHXA3xYQlM' target='_blank'>https://unsplash.com/photos/aZHXA3xYQlM</a>";
            break;
         case "2":
            descriptionText[0].textContent = "Violet Storm";
            descriptionText[1].innerHTML = "a deep, wistful world of red and purple hues — <a href='https://unsplash.com/photos/9XngoIpxcEo' target='_blank'>https://unsplash.com/photos/9XngoIpxcEo</a>";
            break;
         case "3":
            descriptionText[0].textContent = "Underwater Wishes";
            descriptionText[1].innerHTML = "an underwater world full of sunlight and wonder — <a href='https://unsplash.com/photos/QURU8IY-RaI' target='_blank'>https://unsplash.com/photos/QURU8IY-RaI</a>";
      }
   }
   else {
      let state = Flip.getState(e.target);
      $(e.target).css({
         position: "initial",
         width: "40vw",
         left: "initial",
         top: "initial",
         zIndex: 0
      }).appendTo("div#images");
      Flip.from(state, {
         duration: 1.25,
         ease: "power4.inOut",
         onComplete: () => {
            isOnDisplay = false;
         }
      });
      gsap.to(e.target, {
         duration: 0.625,
         scale: 0.65,
         ease: "power4.in",
         rotation: -10,
         onComplete: () => {
            gsap.to(e.target, {
               duration: 0.625,
               scale: 1,
               ease: "power4.out",
               rotation: 0,
               overwrite: "auto"
            });
         }
      });
      gsap.to(descriptionText, {duration: 0.75, opacity: 0, stagger: 0.15, ease: "power3.in", overwrite: "auto"});
   }
}).mouseout(e => {
   gsap.to(e.target, {
      duration: 0.35,
      scale: 1,
      ease: "power3"
   });
});