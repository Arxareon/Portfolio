let vw, vh
let radius
const angles = []

// Custom event types
const events = { menuItemActivation: "menuItemActivation" }

function initializeMenu() {
	/** @type {NodeListOf<HTMLDivElement>} */
	const mainItems = document.querySelectorAll("div.main-item")

	mainItems.forEach((item, index) => {

		/* STYLE */

		const size = parseFloat(window.getComputedStyle(item).width)

		radius = size / 5 + size / 6 * mainItems.length
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
			s = isActive ? .8 : 1;

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
				s = .8

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
	if (e.detail.active) {
		console.log(angles[e.detail.index]) // TODO: place child items along the radial line at this angle
	} else {
		// TODO: Put child items back to the center out of view
	}
})