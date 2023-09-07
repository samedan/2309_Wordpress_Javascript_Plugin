# 2309_Wordpress_Javascript_Plugin

## Javascript loaded into Wordpress

> index.php -> function adminAssets()
> load JS into Wordpress JavaScript: wp.blocks.registerBlockType()

## Install NPM packages

> package.json -> npm init -y
> npm i @wordpress/scripts --save-dev
> add to package.json "npm start", "npm build"
> run "npm run start"

## JavaScript Attributes saved in the Database

> <!-- wp:ourplugin/are-you-paying-attention {"skyColor":"Blue","grassColor":"Red"} -->

## Restore saved versions without errors

> add "deprecated" in index.js

## Load CSS in the Backend

> index.scss
> load index.scss in index.js
> index.php tell adminAssets what files to load

## Questions & Answers

> add & delete answers -> index.js

## Function that is always on

> index.js -> function (functiontexte)()
> Immediatly Invoked Function expression IIFE

## FRONT END React file

> src/frontend.js
> index.php add in 'function theHTML()'
> 'wp-element' in index.php is Wordpress version of React

## Add submenu to right Plugin area

> index.js -> <InspectorControls><PanelBody><PanelRow>
> index.js added in the Attributes Array: bgColor
> <ColorPicker> add onChangeComplete

## Alignment of the Question text on the FrontEnd

> index.js -> wp.blocks.registerBlockType -> attributes -> theAlignment
> frontend.js -> textAlign: props.theAlignment

## Preview Plugin Block on Hover on +

> index.js -> wp.blocks.registerBlockType -> example -> attributes
