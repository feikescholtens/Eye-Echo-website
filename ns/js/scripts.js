//SET COPYRIGHT IN FOOTER

const date = new Date()
const year = date.getFullYear()

document.getElementsByClassName("copyright-text")[0].innerHTML = `Copyright © ${year} Eye Echo`

//PAGE SCROLLING BEHAVIOUR

window.addEventListener("load", updateHeaderPageActive)
document.addEventListener("scroll", updateHeaderPageActive)

const sections = document.getElementsByTagName("section")

const beginPixelsSections = []
for (let i = 0; i < sections.length; i++) beginPixelsSections.push(sections[i].offsetTop - 250)
beginPixelsSections[0] = 0

function updateHeaderPageActive() {
  const userScrolledPixels = window.scrollY

  if (userScrolledPixels >= beginPixelsSections[0] && userScrolledPixels <= beginPixelsSections[1]) setActiveLabel("Home")
  if (userScrolledPixels > beginPixelsSections[1] && userScrolledPixels <= beginPixelsSections[2]) setActiveLabel("Over")
  if (userScrolledPixels > beginPixelsSections[2] && userScrolledPixels <= beginPixelsSections[3]) setActiveLabel("Soorten")
  if (userScrolledPixels > beginPixelsSections[3]) setActiveLabel("Contact")
}

function setActiveLabel(label) {
  document.querySelectorAll(".nav-link").forEach(navLink => navLink.classList.remove("active"))
  document.querySelector(`[data-${label}]`).classList.add("active")

  if (label == "Home") history.pushState("", document.title, window.location.pathname + window.location.search)
  else history.pushState({}, "", `#${label.toLowerCase()}`)
}

//Custom listeners to scroll exactly to the right place
document.querySelectorAll(".nav-link").forEach(navLink => {
  navLink.addEventListener("click", (event) => {

    event.preventDefault()

    //Collapse menu
    $('.navbar-collapse a').on('click', function() {
      $(".navbar-collapse").collapse('hide');
    });

    const label = navLink.innerText
    let pixels

    if (label === "Home" || label.split("\n")[0] === "Eye Echo") pixels = beginPixelsSections[0]
    //Second check in if statement if for logo in navbar
    if (label === "Over") pixels = beginPixelsSections[1] + 100
    if (label === "Soorten") pixels = beginPixelsSections[2] + 169
    if (label === "Contact") pixels = beginPixelsSections[3] + 100

    window.scrollTo({ top: pixels, behavior: "smooth" })

  })
})