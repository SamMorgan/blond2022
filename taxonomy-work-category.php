<?php 
get_header();
    $curr_category = get_queried_object();?>
    <div class="secondary-header site-header">
        <ul class="filters">
            <?php 
                $categories = get_terms( array(
                    'taxonomy' => 'work-category',
                    'hide_empty' => false
                ));
            ?>
            <li><a href="<?php echo home_url('/work');?>">All</a></li>
            <?php foreach($categories as $category){
                $active = '';
                if($category->term_id === $curr_category->term_id){
                    $active = ' class="active"';
                }
                echo '<li><a href="'.get_term_link($category).'"'.$active.'>' . $category->name . '</a></li>';
            } ?>
        </ul>
        <span class="show-menu">menu</span>
    </div> 
    <?php $work_query = new WP_Query( array(
        'post_type' => 'work',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC',
        'tax_query' => array(
            array (
                'taxonomy' => 'work-category',
                'field' => 'term_id',
                'terms' => $curr_category->term_id
                )
            ),
        ) );
    
        include('includes/work-index.php');
    ?>
<?php get_footer(); ?>