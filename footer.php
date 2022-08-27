	</main> 
	<footer class="site-footer info-section" id="contact">
		<div>
			<?php the_field('address','option');?>
        </div>
		<div class="col-2">
			<?php the_field('social','option');?>
            <div class="newsletter">
                <span>Newsletter</span>
                <form>
                    <input type="email" placeholder="email">
                    <button type="submit">Submit</button>
                </form>    
            </div>    
            <div class="privacy-link"><a href="">Privacy Policy</a></div>
			<span class="copy">&copy; <?php echo date('Y');?> <?php bloginfo('name');?></span>
		</div>			
	</footer>
	</div>
	<?php wp_footer(); ?>
	</body>
</html>
