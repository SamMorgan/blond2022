<ul class="filters">
<?php 
    $categories = get_terms( array(
        'taxonomy' => 'work-category',
        'hide_empty' => false
    ));
?>
<li><a class="active" href="<?php echo home_url('/work');?>">All</a></li>
<?php foreach($categories as $category){
    echo '<li><a href="'.get_term_link($category).'" data-slug="'.$category->slug.'">' . $category->name . '</a></li>';
} ?>
</ul>