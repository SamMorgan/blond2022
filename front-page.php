<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
    <div class="intro-wrap custom-cursor-wrap">
        <div class="intro">
            <div class="intro-text"><?php the_content();?></div>
            <div class="scrolldown"></div>
        </div>
        <video class="intro-video" src="<?php the_field('video');?>" playsinline muted loop></video>
        <div class="custom-cursor"></div>
    </div>
<?php endwhile; endif;?>
<?php include('includes/svg-filters.php');?>
<?php get_footer(); ?>