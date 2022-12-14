<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
<div class="secondary-header site-header single-work-header">
    <h1><?php 
        $nav_bar_title = get_field('nav_bar_title');
        if($nav_bar_title){
            echo $nav_bar_title;
        }else{
            $sep = "";
            $year = get_field('year');
            if($year){ echo $year; $sep = " "; }
            $client = get_field('client');
            if($client){ echo $sep.$client; }
            if($year || $client){
                echo ', ';
            }
            the_title();
        }    
    ?></h1>
    <span class="show-menu">menu</span>
</div> 
<div class="work-wrap">   
    <?php 
        $cover_image = get_field('cover_image');
        if($cover_image) :
            $cover_img_ratio = $cover_image['width']/$cover_image['height'];
            echo '<div class="module-full-width-img"><img src="'.$cover_image['url'].'" style="aspect-ratio:'.$cover_img_ratio.'"></div>';
        endif;

        include('includes/content-modules.php');
    ?>
    <?php endwhile; endif;?>

    <div class="site-footer anim-fade-in-up">
        <?php include('includes/footer-content.php');?>			
	</div>
</div> 
<?php
    $work_query = new WP_Query( array(
        'post_type' => 'labs',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ) );

    include('includes/work-index.php');


get_footer();?>