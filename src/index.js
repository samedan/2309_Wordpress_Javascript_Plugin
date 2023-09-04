wp.blocks.registerBlockType("ourplugin/are-you-paying-attention", {
  title: "Are You Paying Attention?",
  icon: "smiley",
  category: "common",
  edit: function () {
    return (
      <div>
        <p>This is a Paragraph</p>
        <h4>This is a h4</h4>
      </div>
    );
  },
  save: function () {
    return (
      <>
        <p>This is a Paragraph</p>
        <h4>This is a h4</h4>
      </>
    );
  },
});
