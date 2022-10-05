<?php 
if( have_rows('content') ):

    while ( have_rows('content') ) : the_row();

        if( get_row_layout() == 'full_width_image' ):
            $image = get_sub_field('image');
            if($image) :
                $ratio = $image['width']/$image['height'];
                echo '<div class="module-full-width-img anim-fade-in-up"><img class="lazy" data-src="'.$image['url'].'" style="aspect-ratio:'.$ratio.'"></div>';
            endif;

        elseif( get_row_layout() == 'two_images' ): 
            echo '<div class="module-two-imgs"><div class="imgwrap anim-fade-in-up">';
                if(get_sub_field('is_video_1')){
                    $video_1 = get_sub_field('video_1');
                    if($video_1){
                        echo '<video playsinline muted loop autoplay src="'.$video_1.'"></video>';
                    }
                }else{
                    $image_1 = get_sub_field('image_1');
                    if($image_1) :
                        $ratio_1 = $image_1['width']/$image_1['height'];
                        echo '<img class="lazy" data-src="'.$image_1['url'].'" style="aspect-ratio:'.$ratio_1.'">';
                    endif;
                }    
            echo '</div><div class="imgwrap anim-fade-in-up">';
                if(get_sub_field('is_video_2')){
                    $video_2 = get_sub_field('video_2');
                    if($video_2){
                        echo '<video playsinline muted loop autoplay src="'.$video_2.'"></video>';
                    }
                }else{ 
                    $image_2 = get_sub_field('image_2');   
                    if($image_2):
                        $ratio_2 = $image_2['width']/$image_2['height'];
                        echo '<img class="lazy" data-src="'.$image_2['url'].'" style="aspect-ratio:'.$ratio_2.'">';
                    endif;
                }    
            echo '</div></div>';

        elseif( get_row_layout() == 'three_images' ): 
            $image_1 = get_sub_field('image_1');
            $image_2 = get_sub_field('image_2');
            $image_3 = get_sub_field('image_3'); 
            echo '<div class="module-three-imgs"><div class="imgwrap anim-fade-in-up">';
                if($image_1):
                    $ratio_1 = $image_1['width']/$image_1['height'];
                    echo '<img class="lazy" data-src="'.$image_1['url'].'" style="aspect-ratio:'.$ratio_1.'">';
                endif;
            echo '</div><div class="imgwrap anim-fade-in-up">';
                if($image_2):
                    $ratio_2 = $image_2['width']/$image_2['height'];
                    echo '<img class="lazy" data-src="'.$image_2['url'].'" style="aspect-ratio:'.$ratio_2.'">';
                endif; 
            echo '</div><div class="imgwrap anim-fade-in-up">';
                if($image_3):
                    $ratio_3 = $image_3['width']/$image_3['height'];
                    echo '<img class="lazy" data-src="'.$image_3['url'].'" style="aspect-ratio:'.$ratio_3.'">';
                endif; 
            echo '</div></div>';          

        elseif( get_row_layout() == 'text' ): 
            echo '<div class="module-text anim-fade-in-up">';
            the_sub_field('text');
            echo '</div>';

        // elseif( get_row_layout() == 'text_3_columns' ): 
        //     echo '<div class="module-text-3-cols"><div class="col-1of3">';
        //     the_sub_field('column_1');
        //     echo '</div><div class="col-1of3">';
        //     the_sub_field('column_2');
        //     echo '</div><div class="col-1of3">';
        //     the_sub_field('column_3');
        //     echo '</div></div>';

        elseif( get_row_layout() == 'space' ): 
            echo '<div class="module-space"></div>';
            
        elseif( get_row_layout() == 'video' ): 
            $video_type = get_sub_field('video_type');
            echo '<div class="module-video anim-fade-in-up">';
                if($video_type === "link"){
                    $video_link = get_sub_field('link');
                    echo '<video class="lazy" data-src="'.$video_link.'" playsinline muted loop autoplay></video>';
                }
                if($video_type === "file"){
                    $video_link = get_sub_field('file');
                    echo '<video class="lazy" data-src="'.$video_link.'" playsinline muted loop autoplay></video>';
                }
                if($video_type === "embed"){
                    echo vimeo_markup(get_sub_field('embed'));
                }
            echo '</div>';

        endif;

    endwhile;

endif;?>