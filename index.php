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
    
    //  echo (__DIR__);
    //  exit();
     // Tell Block what to load 
     register_block_type(__DIR__,
      // 'ourplugin/are-you-paying-attention',
      array(        
        'render_callback' => array($this,'theHTML')
    ));  
   }

   // FRONTEND files
   function theHTML($attributes) {
    // echo wp_json_encode($attributes);
            
      ob_start(); ?> <!-- ob = output buffer -->
          <div class="paying-attention-update-me">
            <pre style="display:none"><?php echo wp_json_encode($attributes); ?></pre>            
          </div>
      <?php return ob_get_clean();

   }
}

$areYouPayingAttention = new AreYouPayingAttention();
