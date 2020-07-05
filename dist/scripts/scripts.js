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
	{
		word: 'OSA',
		image: 'osa.svg',
		letters: ['O', 'S', 'A'],
	},
	{
		word: 'ROBOT',
		image: 'robot.png',
		letters: ['R', 'O', 'B', 'O', 'T'],
	},
	{
		word: 'SER',
		image: 'ser.svg',
		letters: ['S', 'E', 'R'],
	},
	{
		word: 'ZOMBI',
		image: 'zombi.svg',
		letters: ['Z', 'O', 'M', 'B', 'I'],
	},
]
const speak = (text) => {
	var msg = new SpeechSynthesisUtterance(text)
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
		speak(words[nr].word)
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
			speak(letter)
			this.classList = ''
			this.classList.add('animate__animated', 'animate__bounce')
			setTimeout(() => {
				this.classList = ''
			}, 1000)
		})
		letterBox.appendChild(singleLetterContainer)
	})
	finalButton(nr)
}
const checkButton = () => {
	const btn = document.querySelector('#blanks-btn')
	btn.addEventListener('click', function () {
		const blanks = document.querySelector('#blanks-letters')
		if (blanks.textContent) {
			speak(blanks.textContent)
		} else {
			speak('Przeciągnij literki do chmurki.')
		}
	})
}

function finalButton(nr) {
	const btn = document.querySelector('#check-btn')
	btn.addEventListener('click', function () {
		const blanks = document.querySelector('#blanks-letters')
		if (!blanks.textContent) {
			speak('Przeciągnij literki do chmurki.')
		} else if (blanks.childNodes.length !== words[nr].letters.length) {
			speak('Użyj wszystkich literek')
		} else {
			if (blanks.textContent === words[nr].word) {
				speak('Gratulacje! Jesteś świetny!')
				setTimeout(() => {
					location.reload()
				}, 3000)
			} else {
				speak('Ojej, coś się pokręciło. Spróbuj przestawić niektóre literki.')
			}
		}
	})
}

const wordsAmount = words.length
let randomWord = Math.floor(Math.random() * wordsAmount)
createPicture(randomWord)
createLetters(randomWord)
checkButton()
dragula([
	document.getElementById('letters'),
	document.getElementById('blanks-letters'),
])
