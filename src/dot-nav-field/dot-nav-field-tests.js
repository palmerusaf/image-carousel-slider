import { makeDotNavField } from "./dot-nav-field";
import { pubsub } from "../pubsub";
document.body.style.background = "black";

pubsub.subscribe("changeActiveIndex", console.log);
document.body.appendChild(makeDotNavField(4));

pubsub.publish("changeActiveIndex", 2);
