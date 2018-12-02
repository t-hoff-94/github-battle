const highlight = document.createElement('span');

export function highlightLink(e) {
  //console.log(e.target)
  highlight.classList.add('highlight');
  document.body.append(highlight);
  const linkCoords = e.target.getBoundingClientRect();//gets coordinates of an element
  //create custom coordinates to adjust for scroll position
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  }

  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px )`
}
