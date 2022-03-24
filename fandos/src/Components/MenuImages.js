const Images = ["full-chicken", "half-chicken", "quarter-chicken"];

const imagesContext = require.context("../images", false);

const MenuImages = Images.reduce(
  (acc, name) => ((acc[name] = imagesContext(`./${name}.jpg`)), acc),
  {}
);

export default MenuImages;
