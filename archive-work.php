<?php get_header();?>
    <div class="secondary-header site-header">
        <?php include('includes/work-filters.php');?>
        <span class="show-menu">menu</span>
    </div> 
    <?php 
        $work_query = new WP_Query( array(
            'post_type' => 'work',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ) );
        
        include('includes/work-index.php');
    
get_footer(); ?>