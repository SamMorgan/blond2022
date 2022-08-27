<?php 
if( have_rows('content') ):

    while ( have_rows('content') ) : the_row();

        if( get_row_layout() == 'full_width_image' ):
            $image = get_sub_field('image');
            if($image) :
                $ratio = $image['width']/$image['height'];
                echo '<div class="module-full-width-img"><img src="'.$image['url'].'" style="aspect-ratio:'.$ratio.'"></div>';
            endif;

        elseif( get_row_layout() == 'two_images' ): 
            $image_1 = get_sub_field('image_1');
            $image_2 = get_sub_field('image_2');
            echo '<div class="module-two-imgs"><div class="imgwrap">';
                if($image_1) :
                    $ratio_1 = $image_1['width']/$image_1['height'];
                    echo '<img src="'.$image_1['url'].'" style="aspect-ratio:'.$ratio_1.'">';
                endif;
            echo '</div><div class="imgwrap">';
                if($image_2):
                    $ratio_2 = $image_2['width']/$image_2['height'];
                    echo '<img src="'.$image_2['url'].'" style="aspect-ratio:'.$ratio_2.'">';
                endif;
            echo '</div></div>';

        elseif( get_row_layout() == 'three_images' ): 
            $image_1 = get_sub_field('image_1');
            $image_2 = get_sub_field('image_2');
            $image_3 = get_sub_field('image_3'); 
            echo '<div class="module-three-imgs"><div class="imgwrap">';
                if($image_1):
                    $ratio_1 = $image_1['width']/$image_1['height'];
                    echo '<img src="'.$image_1['url'].'" style="aspect-ratio:'.$ratio_1.'">';
                endif;
            echo '</div><div class="imgwrap">';
                if($image_2):
                    $ratio_2 = $image_2['width']/$image_2['height'];
                    echo '<img src="'.$image_2['url'].'" style="aspect-ratio:'.$ratio_2.'">';
                endif; 
            echo '</div><div class="imgwrap">';
                if($image_3):
                    $ratio_3 = $image_3['width']/$image_3['height'];
                    echo '<img src="'.$image_3['url'].'" style="aspect-ratio:'.$ratio_3.'">';
                endif; 
            echo '</div></div>';          

        elseif( get_row_layout() == 'text' ): 
            echo '<div class="module-text">';
            the_sub_field('text');
            echo '</div>';

        elseif( get_row_layout() == 'text_3_columns' ): 
            echo '<div class="module-text-3-cols"><div class="col-1of3">';
            the_sub_field('column_1');
            echo '</div><div class="col-1of3">';
            the_sub_field('column_2');
            echo '</div><div class="col-1of3">';
            the_sub_field('column_3');
            echo '</div></div>';

        elseif( get_row_layout() == 'space' ): 
            echo '<div class="module-space"></div>';

        endif;

    endwhile;

endif;?>