'use strict'
const words = [
	{
		word: 'KOT',
		image: 'kot.png',
		letters: ['K', 'O', 'T'],
	},
	{
		word: 'DOM',
		image: 'dom.png',
		letters: ['D', 'O', 'M'],
	},
	{
		word: 'DYNIA',
		image: 'dynia.png',
		letters: ['D', 'Y', 'N', 'I', 'A'],
	},
]
const playWord = (nr) => {
	var msg = new SpeechSynthesisUtterance(`${words[nr].word}`)
	var voices = window.speechSynthesis.getVoices()
	msg.voice = voices[0]
	window.speechSynthesis.speak(msg)
}
const saySingleLetter = (letter) => {
	var msg = new SpeechSynthesisUtterance(letter)
	var voices = window.speechSynthesis.getVoices()
	msg.voice = voices[0]
	window.speechSynthesis.speak(msg)
}
//wyświetl obraz
const createPicture = (nr) => {
	const pictureBox = document.querySelector('.image-container')
	pictureBox.innerHTML = ''
	pictureBox.style.backgroundImage = `url('./dist/images/${words[nr].image}')`
	pictureBox.classList.add('animate__fadeInDown')
	pictureBox.addEventListener('click', function () {
		playWord(nr)
	})
}

const createLetters = (nr) => {
	const letterBox = document.querySelector('.letters')
	letterBox.innerHTML = ''

	let shuffledLetters = words[nr].letters
		.map((a) => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value)
	shuffledLetters.forEach((letter) => {
		let singleLetterContainer = document.createElement('p')
		singleLetterContainer.textContent = letter
		let color = Math.floor(Math.random() * 360) + 1
		singleLetterContainer.style.color = `hsl(${color}, 100%, 50%)`
		const animationArray = [
			'animate__fadeInUp',
			'animate__fadeInDown',
			'animate__fadeInLeft',
			'animate__fadeInRight',
		]
		let randomAnimation = animationArray[Math.floor(Math.random() * 3) + 1]
		singleLetterContainer.classList.add('animate__animated', randomAnimation)
		singleLetterContainer.addEventListener('click', function () {
			saySingleLetter(letter)
			// this.classList = ''
			// this.classList.add('animate__animated', 'animate__bounce')
		})
		singleLetterContainer.addEventListener('mouseenter', function () {
			this.classList = ''
			this.classList.add('animate__animated', 'animate__bounce')
		})
		singleLetterContainer.addEventListener('mouseleave', function () {
			this.classList.remove('animate__bounce')
		})

		letterBox.appendChild(singleLetterContainer)
	})
}
createPicture(0)
createLetters(0)
dragula([document.getElementById('letters'), document.getElementById('blanks')])
//Powiedz słowo
