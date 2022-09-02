<?php /* Template Name: Work */ 
get_header();?>
    <div class="secondary-header site-header">
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
        $work_query = new WP_Query( array(
            'post_type' => 'work',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ) );
        
        include('includes/work-index.php');
    
get_footer(); ?>