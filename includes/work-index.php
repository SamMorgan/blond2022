<div class="work-index">   
<?php if($work_query->have_posts()) : while ( $work_query->have_posts() ) : $work_query->the_post();
    $thumb_data = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' );
    $thumb_lrg = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
    $thumb_med = wp_get_attachment_image_src( get_post_thumbnail_id(), 'medium' );
    $format = $thumb_data[1] > $thumb_data[2] ? "landscape" : "portrait";?>
    <div class="work-card <?php echo $format;?>">
        <a href="<?php the_permalink();?>"> 
            <?php 
                $bg_colour = get_field('thumb_bg');
                $bg_css = "";
                if($bg_colour){
                    $bg_css = 'background-color:'.$bg_colour.';';
                }
                // echo '<img class="lazy '.$format.'" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\' viewBox=\'0 0 '.$thumb_data[1].' '.$thumb_data[2].'\'%3E%3Crect fill=\'transparent\' width=\'100%25\' height=\'100%25\'/%3E%3C/svg%3E" data-src="'.$thumb_data[0].'" width="'.$thumb_data[1].'" height="'.$thumb_data[2].'"
                //         data-srcset="'.$thumb_data[0].' '.$thumb_data[1].'w,'.$thumb_lrg[0].' '.$thumb_lrg[1].'w,'.$thumb_med[0].' '.$thumb_med[1].'w"
                //         sizes="29rem, (max-width:750px) 45.3125rem">';
                echo '<div class="blond-img"'.$bg_css.' style="--imgsrc:url('.$thumb_data[0].');'.$bg_css.'"><div></div><div></div></div>';
            ?>
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
<?php include('svg-filters.php');?>