let vw, vh

function updateWindowSize() {
	vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
	vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}

function positionMenuItems() {
	/** @type {NodeListOf<HTMLDivElement>} */
	const mainItems = document.querySelectorAll("div.main-item")

	mainItems.forEach((item, index) => {
		const size = parseFloat(window.getComputedStyle(item).width)
		const radius = size / 5 + size / 6 * mainItems.length
		const angle = Math.PI * 2 * (360 / mainItems.length * (index) - 90 + (180 / mainItems.length * (1 - mainItems.length % 2))) / 360

		updateWindowSize()

		item.style.left = (vw - size) / 2 + radius * Math.cos(angle) + "px"
		item.style.top = (vh - size) / 2 + radius * Math.sin(angle) + "px"
	})
}

window.addEventListener('load', positionMenuItems)
window.addEventListener('resize', positionMenuItems)
