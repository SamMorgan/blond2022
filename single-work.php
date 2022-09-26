<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post();?>
<div class="secondary-header site-header single-work-header">
    <h1><?php 
        $sep = "";
        $year = get_field('year');
        if($year){ echo $year; $sep = " "; }
        $client = get_field('client');
        if($client){ echo $sep.$client; }
        if($year || $client){
            echo ', ';
        }
        the_title();
    ?></h1>
    <?php include('includes/work-filters.php');?>
    <span class="show-menu">menu</span>
</div> 
<div class="work-wrap">   
    <?php 
        $cover_image = get_field('cover_image');
        if($cover_image) :
            $cover_img_ratio = $cover_image['width']/$cover_image['height'];
            echo '<div class="module-full-width-img"><img src="'.$cover_image['url'].'" style="aspect-ratio:'.$cover_img_ratio.'"></div>';
        endif;

        include('includes/content-modules.php');
    ?>
    <?php endwhile; endif;?>

    <footer class="site-footer info-section" id="contact">
		<div>
			<?php the_field('address','option');?>
        </div>
		<div class="col-2">
			<?php the_field('social','option');?>
            <div class="newsletter">
                <span>Newsletter</span>
                <form action="//blond.us11.list-manage.com/subscribe/post?u=aeb1a5f0162ceee07cd728f62&amp;id=55d7fc0bf9" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate">
					<input type="email" value="" name="EMAIL" id="mce-EMAIL" class="mailchimp-input font_5lvzol63v" size="16" placeholder="email">
					<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" id="js-validate-robot" name="b_a4752870f583bb49a02427b3c_143fa46c21" tabindex="-1" value=""></div>
                    <button type="submit">Submit</button>
                </form>    
            </div>    
            <div class="privacy-link"><a href="<?php echo home_url('/privacy-policy/');?>">Privacy Policy</a></div>
			<span class="copy">&copy; <?php echo date('Y');?> <?php bloginfo('name');?></span>
		</div>			
	</footer>
</div> 
<?php
    $work_query = new WP_Query( array(
        'post_type' => 'work',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ) );

    include('includes/work-index.php');
?>   
<!-- <div class="back-to-index"></div> -->
<?php get_footer();?>