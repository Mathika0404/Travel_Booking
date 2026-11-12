
const destinations = [
  {
    name: "Tokyo",
    country: "JAPAN",
    places: "Mount Fuji · Tokyo Tower · Shibuya",
    image: "images/tokyo.webp",
    count: "112 stays"
  },
  {
    name: "Kyoto",
    country: "JAPAN",
    places: "Gion · Higashiyama",
    image: "images/kyoto.webp",
    count: "52 stays"
  },
  {
    name: "London",
    country: "UNITED KINGDOM",
    places: "Big Ben · Westminster · London Eye",
    image: "images/london.webp",
    count: "96 stays"
  },
  {
    name: "Maldives",
    country: "INDIAN OCEAN",
    places: "North Malé · Baa Atoll",
    image: "images/maldives.webp",
    count: "74 stays"
  },
  {
    name: "Paris",
    country: "FRANCE",
    places: "Eiffel Tower · The Louvre · Seine",
    image: "images/paris.webp",
    count: "83 stays"
  },
  {
    name: "Singapore",
    country: "SINGAPORE",
    places: "Marina Bay · Sentosa · Gardens by the Bay",
    image: "images/singapore.webp",
    count: "128 stays"
  }
];

const hotels = [
  {id:1,name:"The Ubud Hideaway",place:"Bali, Indonesia",price:189,rating:4.9,tag:"GUEST FAVOURITE",image:"images/hotels1.webp",desc:"A tranquil jungle retreat with a private plunge pool."},
  {id:2,name:"Maison Lumière",place:"Paris, France",price:245,rating:4.8,tag:"CITY ESCAPE",image:"images/hotels2.webp",desc:"A design-led hideaway moments from the Left Bank."},
  {id:3,name:"Azure Lagoon Resort",place:"Maldives",price:390,rating:4.9,tag:"ISLAND DREAM",image:"images/hotels3.webp",desc:"Overwater living with endless Indian Ocean views."},
  {id:4,name:"Gion House",place:"Kyoto, Japan",price:158,rating:4.7,tag:"CULTURE & CALM",image:"images/hotels4.webp",desc:"A serene boutique stay inspired by traditional ryokans."},
  {id:5,name:"Alpine Vista Lodge",place:"Zermatt, Switzerland",price:275,rating:4.8,tag:"MOUNTAIN AIR",image:"images/hotels5.webp",desc:"Cosy chalet comfort with postcard-worthy mountain views."},
  {id:6,name:"Aegean Pearl Suites",place:"Santorini, Greece",price:320,rating:4.9,tag:"ROMANTIC GETAWAY",image:"images/hotels6.webp",desc:"Sunset terraces and a beautiful caldera outlook."},
  {id:7,name:"Coastline Social",place:"Canggu, Bali",price:129,rating:4.6,tag:"DESIGN HOTEL",image:"images/hotels7.webp",desc:"Laid-back design, good coffee and beachside energy."},
  {id:8,name:"Le Petit Jardin",place:"Paris, France",price:175,rating:4.6,tag:"BOUTIQUE PICK",image:"images/hotels8.webp",desc:"A charming base tucked into a leafy neighbourhood."},
  {id:9,name:"Milaidhoo Island",place:"Baa Atoll, Maldives",price:420,rating:5.0,tag:"LUXURY ESCAPE",image:"images/hotels9.webp",desc:"Barefoot luxury, reef adventures and slow island days."},
  {id:10,name:"Hoshinoya Kyoto",place:"Arashiyama, Japan",price:350,rating:4.9,tag:"UNIQUE STAY",image:"images/hotels10.webp",desc:"A riverside sanctuary surrounded by forested hills."}
];
const offers = [
  {label:"ISLAND TIME",title:"Save 20%",desc:"Take a little more time in the tropics. Selected island stays included.",code:"ISLAND20"},
  {label:"A CITY BREAK",title:"3rd night free",desc:"Stay a little longer in selected European city hideaways.",code:"CITY3"},
  {label:"FIRST ADVENTURE",title:"$40 off",desc:"A warm welcome for your first Stackly booking over $250.",code:"HELLO40"}
];
const testimonials = [
  {quote:"Stackly made the whole trip feel effortless. The hotel was even lovelier than the pictures, and the little local recommendations made our week in Bali.",name:"Sophie Williams",detail:"Bali, Indonesia · October 2026",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"},
  {quote:"The best part was how personal everything felt. We found a beautiful little place in Kyoto that we would never have discovered on our own.",name:"Daniel Kim",detail:"Kyoto, Japan · September 2026",avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"},
  {quote:"From the first search to check-out, everything was clear and simple. Our Santorini stay was the highlight of our anniversary trip.",name:"Amelia Carter",detail:"Santorini, Greece · August 2026",avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"},
  {quote:"A brilliant experience. Great value, thoughtful service and a hotel with the most incredible mountain views. Already planning the next trip.",name:"Oliver Bennett",detail:"Swiss Alps · July 2026",avatar:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"},
  {quote:"We loved having a shortlist of places that actually felt special. The whole holiday was relaxed from the moment we booked.",name:"Priya Shah",detail:"Paris, France · June 2026",avatar:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80"},
  {quote:"The support team were kind, quick and genuinely helpful when our plans changed. It made travelling with the family so much easier.",name:"Noah Martin",detail:"Maldives · May 2026",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"}
];

const $ = (selector) => document.querySelector(selector);
const toast = (message) => {
  const el = $("#toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
};
const savedHotels = new Set(JSON.parse(localStorage.getItem("stacklyWishlist") || "[]"));

function renderDestinations(){
  $("#destinationGrid").innerHTML = destinations.map((d,i)=>`
    <article class="destination-card" data-aos="fade-up" data-aos-delay="${i*70}" data-destination="${d.name}">
      <img src="${d.image}" alt="${d.name}" loading="lazy">
      <div class="destination-info"><small>${d.country}</small><h3>${d.name}</h3><span>${d.count} <i class="fa-solid fa-arrow-right"></i></span></div>
    </article>`).join("");
}
function renderHotels(){
  const maxPrice = $("#priceFilter").value;
  const minRating = Number($("#ratingFilter").value);
  const sort = $("#sortHotels").value;
  let filtered = hotels.filter(h => (maxPrice==="all" || h.price < Number(maxPrice)) && h.rating >= minRating);
  if(sort==="low") filtered.sort((a,b)=>a.price-b.price);
  if(sort==="high") filtered.sort((a,b)=>b.price-a.price);
  if(sort==="rating") filtered.sort((a,b)=>b.rating-a.rating);
  $("#resultCount").textContent = `${filtered.length} ${filtered.length===1?"stay":"stays"}`;
  $("#emptyHotels").hidden = filtered.length !== 0;
  $("#hotelGrid").innerHTML = filtered.map((h,i)=>`
    <article class="hotel-card" data-aos="fade-up" data-aos-delay="${(i%3)*70}">
      <div class="hotel-image"><img src="${h.image}" alt="${h.name}" loading="lazy"><span class="hotel-tag">${h.tag}</span>
      <button class="wishlist ${savedHotels.has(h.id)?"saved":""}" data-wishlist="${h.id}" aria-label="${savedHotels.has(h.id)?"Remove from":"Add to"} wishlist"><i class="${savedHotels.has(h.id)?"fa-solid":"fa-regular"} fa-heart"></i></button></div>
      <div class="hotel-info"><span class="hotel-location"><i class="fa-solid fa-location-dot"></i> ${h.place}</span><h3>${h.name}</h3><p class="hotel-desc">${h.desc}</p>
      <div class="hotel-bottom"><span class="rating"><i class="fa-solid fa-star"></i> ${h.rating.toFixed(1)}</span><span class="price"><strong>$${h.price}</strong> <small>/ night</small></span></div>
      <button class="hotel-book" data-book="${h.id}">View booking estimate <i class="fa-solid fa-arrow-right"></i></button></div>
    </article>`).join("");
  if(window.AOS) AOS.refresh();
}
function renderOffers(){
  $("#offerGrid").innerHTML=offers.map((o,i)=>`<article class="offer-card" data-aos="fade-up" data-aos-delay="${i*100}"><small>${o.label}</small><h3>${o.title}</h3><p>${o.desc}</p><div class="coupon-row"><span class="coupon-code">${o.code}</span><button class="copy-coupon" data-coupon="${o.code}" aria-label="Copy ${o.code}"><i class="fa-regular fa-copy"></i></button></div></article>`).join("");
}
let testimonialIndex=0;
function renderTestimonial(){
  const t=testimonials[testimonialIndex];
  $("#testimonialSlider").innerHTML=`<p class="testimonial-quote">${t.quote}</p><div class="testimonial-stars">★★★★★</div><div class="testimonial-person"><img class="testimonial-avatar" src="${t.avatar}" alt=""><div><strong>${t.name}</strong><small>${t.detail}</small></div></div>`;
  $("#testimonialDots").innerHTML=testimonials.map((_,i)=>`<button class="${i===testimonialIndex?"active":""}" data-dot="${i}" aria-label="Show testimonial ${i+1}"></button>`).join("");
}
function changeTestimonial(step){testimonialIndex=(testimonialIndex+step+testimonials.length)%testimonials.length;renderTestimonial();}

document.addEventListener("click", async (event)=>{
 /* DESTINATION IMAGE CLICK - OPEN 404 PAGE */

const destination = event.target.closest("[data-destination]");

if (destination) {
    window.location.href = "404.html";
}
  const wish=event.target.closest("[data-wishlist]");
  if(wish){const id=Number(wish.dataset.wishlist);savedHotels.has(id)?savedHotels.delete(id):savedHotels.add(id);localStorage.setItem("stacklyWishlist",JSON.stringify([...savedHotels]));renderHotels();toast(savedHotels.has(id)?"Added to your wishlist":"Removed from your wishlist");}

/* COUPON CLICK - OPEN 404 PAGE */

const coupon = event.target.closest("[data-coupon]");

if (coupon) {
    window.location.href = "404.html";
}

const book = event.target.closest("[data-book]");

if (book) {
    window.location.href = "404.html";
}

  const dot=event.target.closest("[data-dot]");if(dot){testimonialIndex=Number(dot.dataset.dot);renderTestimonial();}
});
$("#priceFilter").addEventListener("change",renderHotels);
$("#ratingFilter").addEventListener("change",renderHotels);
$("#sortHotels").addEventListener("change",renderHotels);
$("#prevTestimonial").addEventListener("click",()=>changeTestimonial(-1));
$("#nextTestimonial").addEventListener("click",()=>changeTestimonial(1));

const today = new Date(); today.setHours(0,0,0,0);
const toISO = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
$("#checkIn").min=toISO(today);
$("#checkOut").min=toISO(today);
$("#checkIn").addEventListener("change",()=>{
  const inDate=$("#checkIn").value;
  if(inDate){const next=new Date(`${inDate}T00:00:00`);next.setDate(next.getDate()+1);$("#checkOut").min=toISO(next);if($("#checkOut").value && $("#checkOut").value<=inDate)$("#checkOut").value=toISO(next);}
});
$("#searchForm").addEventListener("submit",e=>{
  e.preventDefault();
  const destination=$("#destinationInput").value.trim(), checkIn=$("#checkIn").value, checkOut=$("#checkOut").value;
  if(!destination){toast("Please enter a destination.");$("#destinationInput").focus();return;}
  if(!checkIn||!checkOut){toast("Please select your check-in and check-out dates.");return;}
  if(checkOut<=checkIn){toast("Check-out must be after check-in.");return;}
  const match=destinations.find(d=>d.name.toLowerCase()===destination.toLowerCase());
  if(!match){toast("Try Bali, Paris, Maldives, Kyoto, Swiss Alps or Santorini.");return;}
  $("#hotels").scrollIntoView({behavior:"smooth"});toast(`Your ${destination} search is ready — explore our sample stays.`);
});

$("#newsletterForm").addEventListener("submit", e => {

    e.preventDefault();

    const email = $("#newsletterEmail").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        toast("Please enter a valid email address.");
        return;
    }

    window.location.href = "404.html";

});
const menuToggle=$("#menuToggle"),navLinks=$("#navLinks");
menuToggle.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';});
document.querySelectorAll(".nav-link,.nav-cta").forEach(link=>link.addEventListener("click",()=>{navLinks.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.innerHTML='<i class="fa-solid fa-bars"></i>'; }));
const sections=[...document.querySelectorAll("main section[id],footer[id]")];
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${entry.target.id}`));}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section=>navObserver.observe(section));
const backToTop=$("#backToTop");
window.addEventListener("scroll",()=>{document.querySelector(".site-header").classList.toggle("scrolled",window.scrollY>30);backToTop.classList.toggle("show",window.scrollY>500);});
backToTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

renderDestinations();renderHotels();renderOffers();renderTestimonial();
if(window.AOS){AOS.init({duration:850,easing:"ease-out-cubic",once:true,offset:75});}
document.body.classList.add("loading");
window.addEventListener("load",()=>setTimeout(()=>{const loader=$("#preloader");loader.classList.add("hide");document.body.classList.remove("loading");},900));
setTimeout(()=>{const loader=$("#preloader");if(loader){loader.classList.add("hide");document.body.classList.remove("loading");}},3500);
