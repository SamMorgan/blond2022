<?php /* Template Name: Info */ 
get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
    <div class="secondary-header site-header">
        <ul class="scrollto-links">
            <li><a href="#about">About</a></li>
            <li><a href="#clients">Clients</a></li>
            <li><a href="#awards">Awards</a></li>
            <li><a href="#press">Press</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <span class="show-menu">menu</span>
    </div> 
    <div class="info-wrap">  
        <div id="about" class="info-section"> 
            <?php if( have_rows('about') ): 
                while( have_rows('about') ): the_row(); 

                    $images = get_sub_field('gallery');
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
        <div id="clients" class="info-section clients">
            <?php the_field('clients');?>
        </div>  
        <div id="awards" class="info-section awards">
            <?php 
                if( have_rows('awards') ):
                    while( have_rows('awards') ) : the_row();?>
                        <h4><?php the_sub_field('title');?></h4>
                        <?php the_sub_field('value');
                    endwhile;
                endif;
            ?>
        </div>
        <div id="press" class="info-section press">
            <?php the_field('press');?>
        </div>        
    </div> 
<?php endwhile; endif;?>  
<?php get_footer(); ?>