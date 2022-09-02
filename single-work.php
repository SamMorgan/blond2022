<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
<div class="work-wrap">
    <div class="secondary-header site-header single-work-header">
        <h1><?php 
            $year = get_field('year');
            if($year){ echo $year.' '; }
            $client = get_field('client');
            if($client){ echo $client; }
            if($year || $client){
                echo ', ';
            }
            the_title();
        ?></h1>
        <ul class="filters">
            <?php 
                $categories = get_terms( array(
                    'taxonomy' => 'work-category',
                    'hide_empty' => false
                ));
            ?>
            <li><a class="active" href="<?php echo home_url('/work');?>">All</a></li>
            <?php foreach($categories as $category){
                echo '<li><a href="'.get_term_link($category).'">' . $category->name . '</a></li>';
            } ?>
        </ul>
        <span class="show-menu">menu</span>
    </div>    
    <?php 
        $cover_image = get_field('cover_image');
        if($cover_image) :
            $cover_img_ratio = $cover_image['width']/$cover_image['height'];
            echo '<div class="module-full-width-img"><img src="'.$cover_image['url'].'" style="aspect-ratio:'.$cover_img_ratio.'"></div>';
        endif;

        include('includes/content-modules.php');
    ?>
    <?php endwhile; endif;?>
</div> 
<?php
    $work_query = new WP_Query( array(
        'post_type' => 'work',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ) );
     
    include('includes/work-index.php');
?>   
<?php get_footer(); ?>