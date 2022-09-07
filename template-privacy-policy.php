<?php /* Template Name: Privacy Policy */ 
get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
    <div class="module-formatted-text privacy-policy-wrap">
        <?php the_field('privacy_policy');?>
    </div>    
<?php endwhile; endif;?>  
<?php get_footer(); ?>