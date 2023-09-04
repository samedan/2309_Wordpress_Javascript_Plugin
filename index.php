<?php 

/*
 Plugin Name: Are You Paying Attention Quiz
 Description: Gives the readers a multiple choice question.
 Version: 1.0
 Author: Dan
 Author URI: https://articole.smart.eu

*/

if(! defined('ABSPATH')) exit; // Exit if accessed directly


class AreYouPayingAttention {
   function __construct() {
     add_action('init', array($this, 'adminAssets'));
   }

   function adminAssets() {
     wp_register_script(
       'ournewblocktype', 
       plugin_dir_url(__FILE__) . 'build/index.js',
       array('wp-blocks', 'wp-element') // list of dependecies
     );
     register_block_type(
      'ourplugin/are-you-paying-attention',
      array(
        'editor_script' => 'ournewblocktype',
        'render_callback' => array($this, 'theHTML')
    ));  
   }

   function theHTML($attributes) {
      return '<h1>Today the sky is So '. $attributes['skyColor'].' and 
        the grass is Very '.$attributes['grassColor'].'!!!</h1>';
   }
}

$areYouPayingAttention = new AreYouPayingAttention();
