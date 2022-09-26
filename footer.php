	</main> 
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
	<?php wp_footer(); ?>
	</body>
</html>