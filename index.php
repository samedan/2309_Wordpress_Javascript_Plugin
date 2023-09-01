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
     add_action('enqueue_block_editor_assets', array($this, 'adminAssets'));
   }

   function adminAssets() {
     wp_enqueue_script(
       'ournewblocktype', 
       plugin_dir_url(__FILE__) . 'test.js',
       array('wp-blocks', 'wp-element') // list of dependecies
     );
   }
}

$areYouPayingAttention = new AreYouPayingAttention();
