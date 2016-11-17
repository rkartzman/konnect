<?php
// Allows Wordpress to output the <title> tag
add_theme_support( 'title-tag' );
add_theme_support( 'post-thumbnails', array('newsletter') );

// Disable Admin Bar
function cn_function_admin_bar(){ return false; }
add_filter( 'show_admin_bar' , 'cn_function_admin_bar');

// Menus
function cn_menus() {
    register_nav_menus(array(
        'header-menu' => __( 'Header Menu' ),
        'footer-menu' => __( 'Footer Menu' )
    ));
}
add_action( 'init', 'cn_menus' );