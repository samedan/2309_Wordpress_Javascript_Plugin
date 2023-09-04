wp.blocks.registerBlockType("ourplugin/are-you-paying-attention", {
  title: "Are You Paying Attention?",
  icon: "smiley",
  category: "common",
  attributes: {
    skyColor: { type: "string" },
    grassColor: { type: "string" },
  },
  edit: function (props) {
    function updateSkyColor(event) {
      props.setAttributes({
        skyColor: event.target.value,
      });
    }
    function updateGrassColor(event) {
      props.setAttributes({
        grassColor: event.target.value,
      });
    }
    return (
      <div>
        <p>Test</p>
        <input
          type="text"
          placeholder="sky color"
          onChange={updateSkyColor}
          value={props.attributes.skyColor}
        />
        <input
          type="text"
          placeholder="grass color"
          onChange={updateGrassColor}
          value={props.attributes.grassColor}
        />
      </div>
    );
  },
  save: function (props) {
    return (
      <p>
        Today, the sky is{" "}
        <span className="skyColor">{props.attributes.skyColor}</span> and the
        grass is
        <span className="grassColor">{props.attributes.grassColor}</span>.
      </p>
    );
  },
});
