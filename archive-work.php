<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();

    if( have_rows('sections') ):
    
        $secondary_header = '<div class="secondary-header site-header"><ul class="scrollto-links">';

        echo '<div class="info-wrap">';

        while ( have_rows('sections') ) : the_row();
            
            $section_title = get_sub_field('section_title');
            $secondary_header .= '<li><a href="#'.$section_title.'">'.$section_title.'</a></li>';

            echo '<div id="'.$section_title.'" class="info-section">';
                
                while(has_sub_field("content")):

                    if( get_row_layout() == 'full_width_image' ):
                        $image = get_sub_field('image');
                        if($image) :
                            $ratio = $image['width']/$image['height'];
                            echo '<div class="module-full-width-img anim-fade-in-up"><img class="lazy" data-src="'.$image['url'].'" style="aspect-ratio:'.$ratio.'"></div>';
                        endif;
            
                    elseif( get_row_layout() == 'two_images' ): 
                        $image_1 = get_sub_field('image_1');
                        $image_2 = get_sub_field('image_2');
                        echo '<div class="module-two-imgs"><div class="imgwrap anim-fade-in-up">';
                            if($image_1) :
                                $ratio_1 = $image_1['width']/$image_1['height'];
                                echo '<img class="lazy" data-src="'.$image_1['url'].'" style="aspect-ratio:'.$ratio_1.'">';
                            endif;
                        echo '</div><div class="imgwrap anim-fade-in-up">';
                            if($image_2):
                                $ratio_2 = $image_2['width']/$image_2['height'];
                                echo '<img class="lazy" data-src="'.$image_2['url'].'" style="aspect-ratio:'.$ratio_2.'">';
                            endif;
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
                        
                    elseif( get_row_layout() == 'formatted_text' ): 
                        echo '<div class="module-formatted-text anim-fade-in-up">';
                        the_sub_field('text');
                        echo '</div>'; 

                    elseif( get_row_layout() == 'text_3_cols' ): 
                        echo '<div class="module-text-3cols anim-fade-in-up">';
                        the_sub_field('text');
                        echo '</div>'; 

                    elseif( get_row_layout() == 'gallery' ):

                        $images = get_sub_field('gallery');
                        if( $images ): ?>
                            <div class="info-slider-wrap custom-cursor-wrap">
                                <div class="swiper info-slider">
                                    <div class="swiper-wrapper">
                                        <?php foreach( $images as $image ): ?>
                                            <div class="swiper-slide">
                                                <img class="swiper-lazy" data-src="<?php echo $image['url'];?>">
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                    <div class="swiper-button-prev"></div>
                                    <div class="swiper-button-next"></div>
                                </div>
                                <div class="custom-cursor">click</div>
                            </div>
                        <?php endif;
                    
                    endif;
                
                endwhile; 
            
            echo '</div>';

        endwhile;

        $secondary_header .= '</ul><span class="show-menu">menu</span></div>';
        
        echo '<div class="info-wrap">';
        
        echo $secondary_header;

    endif;
    ?>
    <!-- <div class="secondary-header site-header">
        <ul class="scrollto-links">
            <li><a href="#about" class="active">About</a></li>
            <li><a href="#clients">Clients</a></li>
            <li><a href="#awards">Awards</a></li>
            <li><a href="#press">Press</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <span class="show-menu">menu</span>
    </div>  -->
    <!-- <div class="info-wrap">  
        <div id="about" class="info-section"> 
            <?php if( have_rows('about') ): 
                while( have_rows('about') ): the_row(); 

                    $images = get_field('gallery');
                    $content = get_sub_field('content');
                    if( $images ): ?>
                        <div class="info-slider-wrap custom-cursor-wrap">
                            <div class="swiper info-slider">
                                <div class="swiper-wrapper">
                                    <?php foreach( $images as $image ): ?>
                                        <div class="swiper-slide">
                                            <img class="swiper-lazy" data-src="<?php echo $image['url'];?>">
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            </div>
                            <div class="custom-cursor">click</div>
                        </div>
                    <?php endif;

                    include('includes/content-modules.php');

                endwhile; 
            endif; ?>
        </div> 
        <div id="clients" class="info-section clients anim-fade-in-up">
            <?php the_field('clients');?>
        </div>  
        <div id="awards" class="info-section awards anim-fade-in-up">
            <?php 
                if( have_rows('awards') ):
                    while( have_rows('awards') ) : the_row();?>
                        <h4><?php the_sub_field('title');?></h4>
                        <?php the_sub_field('value');
                    endwhile;
                endif;
            ?>
        </div>
        <div id="press" class="info-section press anim-fade-in-up">
            <?php the_field('press');?>
        </div>        
    </div>  -->
<?php endwhile; endif;?>  
<?php get_footer(); ?>