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
    // load CSS
    wp_register_style(
      'quizeditcss', 
       plugin_dir_url(__FILE__) . 'build/index.css'
    );
    // load JS
     wp_register_script(
       'ournewblocktype', 
       plugin_dir_url(__FILE__) . 'build/index.js',
       array('wp-blocks', 'wp-element', 'wp-editor') // list of dependecies
     );
     // Tell Block what to load 
     register_block_type(
      'ourplugin/are-you-paying-attention',
      array(
        'editor_style' => 'quizeditcss', // CSS
        'editor_script' => 'ournewblocktype', // JS
        'render_callback' => array($this,'theHTML')
    ));  
   }

   // FRONTEND files
   function theHTML($attributes) {
    echo wp_json_encode($attributes);
      // not on the backend, load only once on the frontend
      if(!is_admin()) { 
        wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__).'build/frontend.js', array("wp-element"), '1.0', true);
        wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__).'build/frontend.css');
      }
      
      ob_start(); ?> <!-- ob = output buffer -->
          <div class="paying-attention-update-me">
            <pre style="display:none"><?php echo wp_json_encode($attributes); ?></pre>            
          </div>
      <?php return ob_get_clean();

   }
}

$areYouPayingAttention = new AreYouPayingAttention();
