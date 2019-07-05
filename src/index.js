import addImage from './add-image'
import HelloWorldButton from "./components/hello-world-button/hello-world-button";
import Heading from "./components/heading/heading";

// helloWorld();
addImage();
const heading = new Heading();
heading.render();
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();