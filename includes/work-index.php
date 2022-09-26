<div class="work-index">   
<?php 
if(is_tax('work-category')){
    $curr_category = get_queried_object()->slug;
}
if($work_query->have_posts()) : while ( $work_query->have_posts() ) : $work_query->the_post();
    $px_image = get_field('bleached_image');
    $fc_image = get_field('fc_image');
    $confidential = get_field('confidential') ? " confidential" : "";
    $format = $fc_image['width'] > $fc_image['height'] ? "landscape" : "portrait";
    $data_cats = "";
    $hidden = "";?>
    <?php 
        if(is_tax('work-category') || is_post_type_archive( 'work' ) || is_singular('work')){
            $categories = get_the_terms( get_the_ID(), 'work-category');
            $categories_list = array();
            if ( $categories && ! is_wp_error( $categories ) ) {
                foreach ( $categories as $category ) {
                    $categories_list[] = $category->slug;
                }
            } 
            $data_cats = implode (",",$categories_list);  

            if($curr_category){
                if(in_array($curr_category,$categories_list) == false){
                    $hidden = " hidden";
                }
            } 
        }   
    ?>
    <div class="work-card loading fade-in-up <?php echo $format.$confidential.$hidden;?>"<?php echo $data_cats;?> data-categories="<?php echo $data_cats;?>">
        <a href="<?php the_permalink();?>"> 
            <div class="thumbnail-wrap">
                <?php 
                    if($confidential == " confidential"){
                        echo '<img src="'.$fc_image['url'].'">';
                        echo '<img class="rollover-img" src="'.$px_image['url'].'">';
                    }else{
                        echo '<img src="'.$px_image['url'].'">';
                        echo '<img class="rollover-img" src="'.$fc_image['url'].'">';
                    }
                ?>
            </div>    
            <h3><?php 
                $year = get_field('year');
                if($year){ echo $year; }
                $client = get_field('client');
                if($client){ echo '<br>'.$client; }
                if($year || $client){
                    echo ', ';
                }
                the_title();
            ?></h3>
        </a>        
    </div>           
<?php endwhile; endif;?>
</div>