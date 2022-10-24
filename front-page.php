<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
    <div class="intro-wrap loading" style="background-color:<?php the_field('background_colour');?>">
        <div class="intro">
            <div class="intro-text"><?php the_field('intro_text');?></div>
            <div class="scrolldown custom-cursor-wrap">
            <div class="custom-cursor"></div>
            </div>
        </div>
        <video class="intro-video" playsinline muted loop autoplay>
            <?php 
                $mob_vid = get_field('video_mobile');
                if($mob_vid){
                    echo '<source src="'.$mob_vid.'" media="(orientation: portrait)">';
                }
            ?>  
            <source src="<?php the_field('video');?>"> 
        </video>
        <picture>
            <?php 
                $mob_img = get_field('intro_image_mobile');
                if($mob_img){
                    echo '<source media="(orientation: portrait)" srcset="'.$mob_img.'">';
                }
            ?>    
            <img class="intro-img" src="<?php the_field('intro_image');?>">
        </picture>
        <!-- <img class="intro-img" data-src="<?php the_field('intro_image');?>"> -->
    </div>
<?php endwhile; endif;?>
<?php include('includes/svg-filters.php');?>
<?php get_footer(); ?>