wp.blocks.registerBlockType("ourplugin/are-you-paying-attention", {
  title: "Are You Paying Attention?",
  icon: "smiley",
  category: "common",
  edit: function () {
    return wp.element.createElement(
      "h3", // type of html element
      null, // type of propertu, class
      "Hello, this is from the admin editor screen" // children or content
    );
  },
  save: function () {
    return wp.element.createElement(
      "h1", // type of html element
      null, // type of propertu, class
      "Hello, this is from front end" // children or content
    );
  },
});
