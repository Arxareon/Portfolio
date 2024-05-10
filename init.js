let vw, vh
const radii = []
const angles = []

function initializeMenu() {
	/** @type {NodeListOf<HTMLDivElement>} */
	const mainItems = document.querySelectorAll("div.main-item")

	mainItems.forEach((item, index) => {
		const size = parseFloat(window.getComputedStyle(item).width)
		radii[index] = size / 5 + size / 6 * mainItems.length
		angles[index] = Math.PI * 2 * (360 / mainItems.length * (index) - 90 + (180 / mainItems.length * (1 - mainItems.length % 2))) / 360

		// Active parameters
		let isOver = false
		let isActive = false
		let x = radii[index] * Math.cos(angles[index])
		let y = radii[index] * Math.sin(angles[index])
		let s = 1

		// Init style
		item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
		// item.style.transition = "all " + window.getComputedStyle(document.documentElement).getPropertyValue('--transition-duration'); + "ease-in-out"

		// Event updates
		item.addEventListener("mouseover", function() {
			isOver = true
			s = isActive ? .9 : 1.1;

			//Update style
			item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
		})
		item.addEventListener("mouseout", function() {
			isOver = false
			s = isActive ? .8 : 1;

			//Update style
			item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
		})
		item.addEventListener("click", function() {
			if (isActive) {
				isActive = false
				x = radii[index] * Math.cos(angles[index])
				y = radii[index] * Math.sin(angles[index])
				s = 1
			} else {
				isActive = true
				x = 0
				y = 0
				s = .8
			}

			//Update style
			item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
		})
		document.addEventListener('click', function() {
			if (isOver) { return }

			isActive = false
			x = radii[index] * Math.cos(angles[index])
			y = radii[index] * Math.sin(angles[index])
			s = 1

			//Update style
			item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
		}, true);
	})
}

function activateMenuITem() {

}

window.addEventListener('load', initializeMenu)