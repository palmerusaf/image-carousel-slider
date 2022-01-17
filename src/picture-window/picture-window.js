import { pubsub } from "../pubsub";
import "./picture-window-style.scss";

export function makePictureWindow(documentPictures) {
  const container = document.createElement("div");
  container.classList = "picture-window";
  _addAttributesToPictures(documentPictures);
  container.appendChild(_makeNavOverlay());
  container.appendChild(_groupPictures(documentPictures));
  return container;
}

function _makeNavOverlay() {
  const navOverlay = document.createElement("div");
  navOverlay.classList = "nav-overlay";
  navOverlay.appendChild(_makeArrowButton("previous"));
  navOverlay.appendChild(_makeArrowButton("next"));
  return navOverlay;
}

function _makeArrowButton(direction) {
  const button = document.createElement("button");
  button.classList = `nav-overlay__${direction}-button`;
  button.addEventListener("click", () =>
    pubsub.publish(`${direction}ButtonPressed`)
  );
  const arrowIcon = document.createElement("span");
  arrowIcon.classList = "material-icons";
  arrowIcon.textContent = "arrow_forward_ios";
  button.appendChild(arrowIcon);
  _appendGoogleIconCSS();
  return button;

  function _appendGoogleIconCSS() {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
}

function _addAttributesToPictures(documentPictures) {
  documentPictures.forEach((picture, index) => {
    picture.dataset.index = index;
    picture.classList.add("picture-window__picture");
  });
}

function _groupPictures(documentPictures) {
  const groupedPictures = document.createDocumentFragment();
  documentPictures.forEach((picture) => {
    groupedPictures.appendChild(picture);
  });
  return groupedPictures;
}

function _setSelectedImgClassToActive(indexOfSelectedImg) {
  const allImgs = [
    ...document.getElementsByClassName("picture-window__picture"),
  ];
  _removeActiveClassFromAllImgs(allImgs);
  const selectedImg = allImgs.find(
    (img) => Number(img.dataset.index) === Number(indexOfSelectedImg)
  );
  selectedImg.classList.add("picture-window__picture--active");

  function _removeActiveClassFromAllImgs(allImgs) {
    allImgs.forEach((img) =>
      img.classList.remove("picture-window__picture--active")
    );
  }
}
pubsub.subscribe("changeActiveIndex", _setSelectedImgClassToActive);
