<!DOCTYPE html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#212121">
    <link type="text/css" rel="stylesheet" href="style.css">

    <link type="text/css" rel="stylesheet" href="<?php bloginfo('stylesheet_url'); echo '?ver=' . filemtime( get_stylesheet_directory() . '/style.css'); ?>">
    <?php global $og_description, $page_animate, $nav_animate; ?>
    <?php wp_head(); ?>


    <!-- Page animation class -->
    <?php
    $page_animate_class = $page_animate ? ' animate-page' : '';
    $nav_animate_class = $nav_animate ? ' animate-nav' : '';
    ?>

    <!-- Make sure overlay is hidden & pages with load-in animations should show, when theres no javascript -->
    <noscript>
        <style type="text/css">
            .glitch-overlay {
                display: none!important;
            }
            .animate-page .body-section,
            .animate-page.animate-nav .nav .inner {
                -moz-opacity: 1!important;
                -khtml-opacity: 1!important;
                opacity: 1!important;
                -webkit-transform: translate3D(0,0,0)!important;
                transform: translate3D(0,0,0)!important;
            }

            .animate-page .brand-page .scalein-onload,
            .animate-page .news-page .scalein-onload {
                transform: scale(1)!important;
                opacity: 1!important;
            }
        </style>
    </noscript>

</head>

<body class="scrolling-up<?=$page_animate_class . $nav_animate_class?>">


    <div class="nav">
        <div class="inner">
            <?php if ( has_nav_menu('header-menu') ) : ?>
            <div class="nav-wrap check-scroll">
            <?php wp_nav_menu(array(
                    'theme_location' => 'header-menu',
                    'container' => 'li',
                    'items_wrap' => '<ul>%3$s</ul>')
            ); ?>
            </div><!-- .nav-wrap -->
            <?php endif;?><!-- #main-nav -->

        </div><!-- .inner -->
    </div><!-- .nav -->

