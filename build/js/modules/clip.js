const WIDTH_DESKTOP_CUT = 1825;
const WIDTH_MOBILE_CUT = 510;
const WIDTH_TABLET = 1399;

const page = document.body;
const elementClip = document.querySelector('[data-clip]');

const cutText = (text, maxLength) => {
  if(text.length > maxLength) {
    text = `${text.substr(0,maxLength)}...`;
  }
  return text;
};

if (elementClip  && page.clientWidth < WIDTH_DESKTOP_CUT && page.clientWidth > WIDTH_TABLET) {
  elementClip.textContent = cutText(elementClip.textContent, 30);

}

if(elementClip  && page.clientWidth < WIDTH_MOBILE_CUT) {
  elementClip.textContent = cutText(elementClip.textContent, 25);
}
