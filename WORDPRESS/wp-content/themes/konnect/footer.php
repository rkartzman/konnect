
        <div class="footer-section dark-bg">
            <div class="mobile-detect"></div><!-- .mobile-detect -->
            <div class="contain no-pad cf">
                <?php if ( has_nav_menu('footer-menu') ) : ?>
                <?php wp_nav_menu(array(
                        'theme_location' => 'footer-menu',
                        'container' => 'li',
                        'items_wrap' => '<ul>%3$s</ul>')
                ); ?>
                <?php endif;?><!-- #main-nav -->




            </div><!-- .contain -->
        </div><!-- .footer-section -->


        <script src="<?php bloginfo('template_url'); ?>/js/vendor.js<?php echo '?ver=' . filemtime( get_stylesheet_directory() . '/js/vendor.js'); ?>"></script>
        <script src="<?php bloginfo('template_url'); ?>/js/app.js<?php echo '?ver=' . filemtime( get_stylesheet_directory() . '/js/app.js'); ?>"></script>

    <?php wp_footer(); ?>
    </body>
</html>