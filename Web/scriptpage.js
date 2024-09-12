function makeDraggable(paper) {
  let shiftX, shiftY;

  function moveAt(pageX, pageY) {
    paper.style.left = pageX - shiftX + 'px';
    paper.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  function onTouchMove(event) {
    moveAt(event.touches[0].pageX, event.touches[0].pageY);
  }

  function removeBlur() {
    if (paper.classList.contains('image')) {
      const img = paper.querySelector('img');
      if (img) {
        img.style.filter = 'none'; // Remove the blur effect
      }
    }
  }

  function onMouseDown(event) {
    event.preventDefault();
    removeBlur();
    shiftX = event.clientX - paper.getBoundingClientRect().left;
    shiftY = event.clientY - paper.getBoundingClientRect().top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onTouchStart(event) {
    event.preventDefault();
    removeBlur();
    shiftX = event.touches[0].clientX - paper.getBoundingClientRect().left;
    shiftY = event.touches[0].clientY - paper.getBoundingClientRect().top;

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function onTouchEnd() {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  }

  paper.addEventListener('mousedown', onMouseDown);
  paper.addEventListener('touchstart', onTouchStart);

  paper.ondragstart = function () {
    return false;
  };
}

// Initialize draggable function for all papers
document.querySelectorAll('.paper').forEach(paper => makeDraggable(paper));
