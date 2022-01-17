# image-carousel-slider

## Description

This JS function will create an image gallery slider by taking images the user has labeled with class name `slide-image` and placing them into a container the user has labeled `image-slider`.

## [ GitHub Repository ](https://github.com/palmerusaf/image-carousel-slider)

## [Live Preview Example](https://palmerusaf.github.io/image-carousel-slider)

## How to use

#### Without NPM

- Download the file [here](https://raw.githubusercontent.com/palmerusaf/image-carousel-slider/main/dist/main.js) and include the following `<script>` tag in the head of your html document.

- `<script src='path/to/file/main.js' defer>`
- Then for the images you want to have displayed in the image slider add the class name `slide-image`.
- You will also need to create a container such as a div to container the image slider and add the class name `image-slider`.
- Example:
  ```
  <div class="image-slider"></div>
  <img src="./path/to/pic1.jpg" alt="" class="slide-image" />
  <img src="./path/to/pic2.jpg" alt="" class="slide-image" />
  <img src="./path/to/pic3.jpg" alt="" class="slide-image" />
  <img src="./path/to/pic4.jpg" alt="" class="slide-image" />
  <img src="./path/to/pic5.jpg" alt="" class="slide-image" />
  ```

#### With NPM (preferred)

- Enter the following into the command line:
  `npm i image-carousel-slider`
- There are three ways to use this module with NPM

  1. Without a module bundler:
     The steps are the same as without NPM except add the following script tag to the head of your html file:
     `<script src='node_modules/image-carousel-slider/dist/main.js' defer>`

  2. With bundler nodes already added to html document:
     Simply add the following line to the import list of your index.js file:
     `import 'image-carousel-slider'`
  3. If adding the links programmatically add the following line after appending your links:
     `makeImageSlider();`

     Example:

  ```
  import {makeImageSlider} from "image-carousel-slider";

  const imageSlider = document.createElement("div");
  imageSlider.classList = "image-slider";
  document.body.appendChild(imageSlider);

  const img1 = document.createElement("img");
  img1.classList = "slide-image";
  img1.src = require("./path/to/pic1.jpg");

  const img2 = document.createElement("img");
  img2.classList = "slide-image";
  img2.src = require("./path/to/pic2.jpg");

  const img3 = document.createElement("img");
  img3.classList = "slide-image";
  img3.src = require("./path/to/pic3.jpg");

  const img4 = document.createElement("img");
  img4.classList = "slide-image";
  img4.src = require("./path/to/pic4.jpg");

  makeImageSlider();
  ```

## How to Style
To change the default sizing use class `image-slider`;

Example:
```
.image-slider{
    width: 80%
    height:80%
}
```

