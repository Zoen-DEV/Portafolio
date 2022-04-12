// fecha del footer
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

//texto animado
const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

const texts = [
	"HTML",
	"CSS",
	"JAVASCRIPT",
	"REACT.JS"
];

// control de velocidad del texto animado
const morphTime = 1.5;
const cooldownTime = 1;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}

// blur filter to the text.
function setMorph(fraction) {
	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

// Animation loop
function animate() {
	requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph();
	} else {
		doCooldown();
	}
}

// Start the animation.
animate();

// Nav toggle
const toggleLinks = document.querySelector('.toggle-links');
const toggleBtn = document.querySelector('.nav-toggle');
const main = document.querySelector('.main-container');
const head = document.querySelector('.header');

toggleBtn.addEventListener('click', (e) => {
	toggleLinks.classList.toggle('show-links');
	main.classList.toggle('main-withtoggle');
	toggleBtn.classList.toggle('btn-toggle-active');
	head.classList.toggle('header-withtoggle');
})