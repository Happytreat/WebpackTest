import './hello-world-button.css'

class HelloWorldButton {
  buttonCssClass = 'hello-world-button';

  render() {
    const button = document.createElement('button');
    button.innerHTML = 'Click me now!';
    button.classList.add(this.buttonCssClass);
    const body = document.querySelector('body');
    button.onclick = () => {
      const p = document.createElement('p');
      p.innerHTML = 'Hello World! Creating my first webpack with javascript.';
      p.classList.add('hello-world-text');
      body.appendChild(p);
    };
    body.appendChild(button);
  }
}

export default HelloWorldButton;