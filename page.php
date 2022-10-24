<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
    <div class="secondary-header site-header single-work-header">
        <h1><?php the_title();?></h1>
        <span class="show-menu">menu</span>
    </div>
    <div class="page-wrap">        
        <?php while(has_sub_field("content")):
            if( get_row_layout() == 'full_width_image' ):
                $image = get_sub_field('image');
                if($image) :
                    $ratio = $image['width']/$image['height'];
                    echo '<div class="module-full-width-img anim-fade-in-up"><img src="'.$image['url'].'" style="aspect-ratio:'.$ratio.'"></div>';
                endif;
    
            elseif( get_row_layout() == 'two_images' ): 
                $image_1 = get_sub_field('image_1');
                $image_2 = get_sub_field('image_2');
                echo '<div class="module-two-imgs"><div class="imgwrap anim-fade-in-up">';
                    if($image_1) :
                        $ratio_1 = $image_1['width']/$image_1['height'];
                        echo '<img src="'.$image_1['url'].'" style="aspect-ratio:'.$ratio_1.'">';
                    endif;
                echo '</div><div class="imgwrap anim-fade-in-up">';
                    if($image_2):
                        $ratio_2 = $image_2['width']/$image_2['height'];
                        echo '<img src="'.$image_2['url'].'" style="aspect-ratio:'.$ratio_2.'">';
                    endif;
                echo '</div></div>';
                
            elseif( get_row_layout() == 'three_images' ): 
                $image_1 = get_sub_field('image_1');
                $image_2 = get_sub_field('image_2');
                $image_3 = get_sub_field('image_3'); 
                echo '<div class="module-three-imgs"><div class="imgwrap anim-fade-in-up">';
                    if($image_1):
                        $ratio_1 = $image_1['width']/$image_1['height'];
                        echo '<img src="'.$image_1['url'].'" style="aspect-ratio:'.$ratio_1.'">';
                    endif;
                echo '</div><div class="imgwrap anim-fade-in-up">';
                    if($image_2):
                        $ratio_2 = $image_2['width']/$image_2['height'];
                        echo '<img src="'.$image_2['url'].'" style="aspect-ratio:'.$ratio_2.'">';
                    endif; 
                echo '</div><div class="imgwrap anim-fade-in-up">';
                    if($image_3):
                        $ratio_3 = $image_3['width']/$image_3['height'];
                        echo '<img src="'.$image_3['url'].'" style="aspect-ratio:'.$ratio_3.'">';
                    endif; 
                echo '</div></div>';    
                
            elseif( get_row_layout() == 'text' ): 
                $mob_text = get_sub_field('text_mobile');
                $desktop_text = get_sub_field('text');
                if($mob_text){
                    echo '<div class="module-text anim-fade-in-up">
                            <div class="hide-mobile">'.$desktop_text.'</div>
                            <div class="hide-desktop">'.$mob_text.'</div>
                            </div>'; 
                }else{
                    echo '<div class="module-text anim-fade-in-up">'.$desktop_text.'</div>';  
                }                      
                
            elseif( get_row_layout() == 'formatted_text' ): 
                $mob_text = get_sub_field('text_mobile');
                $desktop_text = get_sub_field('text');
                if($mob_text){
                    echo '<div class="module-formatted-text anim-fade-in-up">
                            <div class="hide-mobile">'.$desktop_text.'</div>
                            <div class="hide-desktop">'.$mob_text.'</div>
                            </div>';   
                }else{
                    echo '<div class="module-formatted-text anim-fade-in-up">'.$desktop_text.'</div>';  
                } 

            elseif( get_row_layout() == 'text_3_cols' ): 
                echo '<div class="module-text-3cols anim-fade-in-up">';
                the_sub_field('text');
                echo '</div>'; 

            elseif( get_row_layout() == 'gallery' ):

                if( have_rows('gallery_with_mobile') ): ?>
                    <div class="info-slider-wrap custom-cursor-wrap">
                        <div class="swiper info-slider">
                            <div class="swiper-wrapper">
                                <?php while( have_rows('gallery_with_mobile') ) : the_row();
                                    $img = get_sub_field('image');
                                    $img_mob = get_sub_field('image_mobile');?>
                                    <div class="swiper-slide">
                                        <picture>
                                            <source media="(orientation: landscape)" srcset="<?php echo $img['url'];?>">
                                            <?php if($img_mob){
                                                echo '<source media="(orientation: portrait)" srcset="'.$img_mob['url'].'">';
                                            } ?>
                                            <img src="<?php echo $img['url'];?>">
                                        </picture>
                                    </div>
                                <?php endwhile;?>
                            </div>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-pagination"></div>
                        </div>
                        <div class="custom-cursor">click</div>
                    </div>
                <?php endif;
            
            endif;
        
        endwhile;?>
    </div>    
    <?php endwhile; endif;?>  
<?php get_footer(); ?>