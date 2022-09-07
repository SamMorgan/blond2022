<?php get_header();

    $work_query = new WP_Query( array(
        'post_type' => 'labs',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ) ); 
    
    include('includes/work-index.php');
    
get_footer(); ?>