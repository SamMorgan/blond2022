<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
    <div class="intro-wrap loading">
        <div class="intro">
            <div class="intro-text"><?php the_field('intro_text');?></div>
            <div class="scrolldown custom-cursor-wrap">
            <div class="custom-cursor"></div>
            </div>
        </div>
        <video class="intro-video" src="<?php the_field('video');?>" playsinline muted loop autoplay></video>
        <img class="intro-img" data-src="<?php the_field('intro_image');?>">
    </div>
<?php endwhile; endif;?>
<?php include('includes/svg-filters.php');?>
<?php get_footer(); ?>