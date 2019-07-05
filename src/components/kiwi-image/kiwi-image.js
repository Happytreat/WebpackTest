import Kiwi from "../../../asset/kiwi.jpg";
import './kiwi-image.scss';

class KiwiImage {
  render() {
    const img = document.createElement('img');
    img.alt = 'Kiwi2';
    img.src = Kiwi;
    img.classList.add('kiwi-image');

    const body = document.querySelector('body');
    body.appendChild(img);
  }
}

export default KiwiImage;