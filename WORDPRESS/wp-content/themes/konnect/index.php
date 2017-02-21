<?php
/* Template Name: Home */

get_header();


?>

<div class="body-section home-page">

    <!-- HOME PAGE MODULES -->
    <div id="primary">
    	<main id="main" class="site-main" role="main">
    		<div class="landing__section">
    			<div class="logo">
    				<img src="wp-content/themes/konnect/images/logo_placeholder.png" alt="">
    			</div>
    			<div class="landing__img blur">
    				<img src="<?= 'wp-content/themes/konnect/images/bg.jpg'; ?>" alt="">
    			</div>
    			<div class="branding__info blur">
    				<div class="wrap">
    					<div class="branding__text"></div>
    					<a href="" class="scroll__menu">
    						<span>
    							<!-- icon -->
    							<svg class="icon icon-arrow-down"><use xlink:href="#icon-arrow-down"></use></svg>
    						</span>
    					</a>
    				</div>
    			</div>
    		</div>
    		<section class="info__section">
    			<div class="wrap">
    				<h1 class="h1">Play real golf all year round</h1>
    				<p class="site__copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum eleifend orci, in tempor enim placerat ac.</p>
    			</div>
    			<div class="coming-soon__block">
    				<p>Coming Soon <a href="" class="primary__link">Midtown East, NYC</a></p>
    			</div>
    		</section>
    	</main>
    </div>

    <!-- SOCIAL MODULE -->


</div><!-- .body-section -->


<!-- HOME SPLASH OVERLAY -->


<?php get_footer(); ?>
