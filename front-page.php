<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
    <div class="intro-wrap custom-cursor-wrap">
        <div class="intro">
            <div class="intro-text"><?php the_content();?></div>
            <div class="scrolldown"></div>
        </div>
        <?php 
        $intro_image = get_field('intro_image');
        if($intro_image){
            echo '<div class="intro-image"><img class="lazy" data-src="'.$intro_image['url'].'"></div>';
        }
        $images = get_field('gallery');
        if( $images ): ?>
            <div class="swiper home-slider custom-cursor-wrap">
                <div class="swiper-wrapper">
                    <?php foreach( $images as $image ): ?>
                        <div class="swiper-slide">
                            <!-- <div class="blond-img swiper-lazy" style="--imgsrc:url(<?php echo $image['url'];?>)" data-background="<?php echo $image['url'];?>"><div></div><div></div></div> -->
                            <img class="swiper-lazy" data-src="<?php echo $image['url'];?>">
                        </div>
                    <?php endforeach; ?>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        <?php endif; ?>
        <div class="custom-cursor"></div>
    </div>
<?php endwhile; endif;?>
<?php include('includes/svg-filters.php');?>
<?php get_footer(); ?>