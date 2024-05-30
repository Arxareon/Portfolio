let vw, vh
let radius
const angles = []

// Custom event types
const events = { menuItemActivation: "menuItemActivation" }

// CSS variables
const arsScale = getComputedStyle(document.querySelector(':root')).getPropertyValue('--ars-scale');
const subItemScale = getComputedStyle(document.querySelector(':root')).getPropertyValue('--sub-item-scale');

function initializeMenu() {
	/** @type {NodeListOf<HTMLDivElement>} */
	const mainItems = document.querySelectorAll("div.main-item")

	mainItems.forEach((item, index) => {
		const size = parseFloat(window.getComputedStyle(item).width)

		radius = size / 4.5 + size / 6 * mainItems.length
		angles[index] = Math.PI * 2 * (360 / mainItems.length * (index) - 90 + (180 / mainItems.length * (1 - mainItems.length % 2))) / 360

		let x = radius * Math.cos(angles[index])
		let y = radius * Math.sin(angles[index])
		let s = 1
	
		// Init style
		item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
		// item.style.transition = "all " + window.getComputedStyle(document.documentElement).getPropertyValue('--transition-duration'); + "ease-in-out"


		/* EVENTS */

		let isOver = false
		let isActive = false

		// Custom events

		const menuItemActivated = new CustomEvent(events.menuItemActivation, { detail: {
			index: index,
			active: true,
		} })

		const menuItemDeactivated = new CustomEvent(events.menuItemActivation, { detail: {
			index: index,
			active: false,
		} })

		// Register handlers

		item.addEventListener("mouseover", function() {
			isOver = true
			s = isActive ? .9 : 1.1;

			// Update style
			item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
		})

		item.addEventListener("mouseout", function() {
			isOver = false
			s = isActive ? arsScale : 1;

			// Update style
			item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
		})

		item.addEventListener("click", function() {
			if (isActive) {
				isActive = false
				x = radius * Math.cos(angles[index])
				y = radius * Math.sin(angles[index])
				s = 1

				// Call listeners
				document.dispatchEvent(menuItemDeactivated)
			} else {
				isActive = true
				x = 0
				y = 0
				s = arsScale

				// Call listeners
				document.dispatchEvent(menuItemActivated)
			}

			// Update style
			item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
		})

		document.addEventListener('click', function() {
			if (isOver) { return }

			isActive = false
			x = radius * Math.cos(angles[index])
			y = radius * Math.sin(angles[index])
			s = 1

			// Call listeners
			document.dispatchEvent(menuItemDeactivated)

			// Update style
			item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
		}, true);
	})
}

window.addEventListener('load', initializeMenu)

document.addEventListener(events.menuItemActivation, (e) => {
	/** @type {NodeListOf<HTMLDivElement>} */
	const subItems = document.querySelectorAll("div.menu-id_" + e.detail.index)

	subItems.forEach((item, index) => {
		const size = parseFloat(window.getComputedStyle(item).width)

		let x = 0
		let y = 0
		let s = subItemScale

		if (e.detail.active) {
			let r = size / 6 + size / 8 * angles.length * (index + 1)

			x = r * Math.cos(angles[e.detail.index])
			y = r * Math.sin(angles[e.detail.index])
		}

		// Update style
		item.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + s + ")"
	})
})