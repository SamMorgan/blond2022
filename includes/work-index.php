<div class="work-index">   
<?php if($work_query->have_posts()) : while ( $work_query->have_posts() ) : $work_query->the_post();
    $bleached_image = get_field('bleached_image');
    $fc_image = get_field('fc_image');
    $confidential = get_field('confidential') ? " confidential" : "";
    $format = $fc_image['width'] > $fc_image['height'] ? "landscape" : "portrait";?>
    <div class="work-card loading <?php echo $format.$confidential;?>">
        <a href="<?php the_permalink();?>"> 
            <div class="thumbnail-wrap">
                <?php echo '<img class="thumbnail" data-src="'.$fc_image['url'].'" width="'.$fc_image['width'].'" height="'.$fc_image['height'].'">';?>
            </div>    
            <h3><?php 
                $year = get_field('year');
                if($year){ echo $year.' '; }
                $client = get_field('client');
                if($client){ echo $client; }
                if($year || $client){
                    echo ', ';
                }
                the_title();
            ?></h3>
        </a>        
    </div>           
<?php endwhile; endif;?>
</div>