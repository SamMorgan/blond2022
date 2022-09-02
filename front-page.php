<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>

        <div class="intro">
            <div class="intro-text"><?php the_content();?></div>
            <div class="scrolldown custom-cursor-wrap">
                <div class="custom-cursor">scroll</div>
            </div>
        </div>
        <?php $images = get_field('gallery');
        if( $images ): ?>
            <div class="swiper home-slider custom-cursor-wrap">
                <div class="swiper-wrapper">
                    <?php foreach( $images as $image ): ?>
                        <div class="swiper-slide">
                            <div class="blond-img swiper-lazy" style="--imgsrc:url(<?php echo $image['url'];?>)" data-background="<?php echo $image['url'];?>"><div></div><div></div></div>
                        </div>
                    <?php endforeach; ?>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="custom-cursor">click</div>
            </div>
        <?php endif; ?>
    
<?php endwhile; endif;?>
<?php include('includes/svg-filters.php');?>
<?php get_footer(); ?>