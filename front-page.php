<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
    <div class="custom-cursor-wrap">
        <div class="intro"><?php the_content();?></div>
        <?php $images = get_field('gallery');
        if( $images ): ?>
            <div class="swiper home-slider">
                <div class="swiper-wrapper">
                    <?php foreach( $images as $image ): ?>
                        <div class="swiper-slide">
                            <div class="blond-img swiper-lazy" style="--imgsrc:url(<?php echo $image['url'];?>)" data-background="<?php echo $image['url'];?>"><div></div><div></div></div>
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