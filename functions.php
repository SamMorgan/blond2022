<?php
/*
 * Enable post thumbnail support
 */
  add_theme_support( 'post-thumbnails' );

  //set_post_thumbnail_size( 600, 400, true ); // Normal post thumbnails
  //add_image_size( 'banner-thumb', 566, 250, true ); // Small thumbnail size
  //add_image_size( 'project-thumb', 468, 614, true ); // Square thumbnail used by sharethis and facebook  


/*
 * Enable Wordpress features
 */
  
  // Enable styling of Admin
  //add_editor_style('css/editor-style.css'); 
   
    // Turn on menus
  register_nav_menus(
    array(
      'main_menu' => 'Main Menu',
      //'footer_menu' => 'Footer Menu',
    )
  );

    // admin bar off //
    add_action("user_register", "set_user_admin_bar_false_by_default", 10, 1);
    function set_user_admin_bar_false_by_default($user_id) {
        update_user_meta( $user_id, 'show_admin_bar_front', 'false' );
        update_user_meta( $user_id, 'show_admin_bar_admin', 'false' );
    }
    // Set WordPress theme varibles
  // if ( ! isset( $content_width ) ) {
  //  $content_width = 720;
  // }
  // function set_content_width() {
  //  global $content_width;
  //  if ( is_single() ) {
  //    $content_width = 720;   
  //  } else {
  //    $content_width = 720;
  //  }
  // }
  // add_action( 'template_redirect', 'set_content_width' );
    
    // Excerpts for pages
   // add_post_type_support( 'page', 'excerpt' );     



    function enqueue_scripts_styles() {

        wp_enqueue_script( 'js', get_template_directory_uri() . "/dist/bundle.js", array(), filemtime( get_stylesheet_directory() . '/dist/bundle.js' ), true );

        // wp_localize_script( 'js', 'sitevars', array(
        //     'ajaxurl'   => admin_url( 'admin-ajax.php' ),
        //     'homeurl'   => home_url()
        //     )
        // );    
     
        wp_enqueue_style( 'style', get_template_directory_uri() . "/dist/bundle.css", array(), filemtime( get_stylesheet_directory() . '/dist/bundle.css' ) );
    }
    add_action( 'wp_enqueue_scripts', 'enqueue_scripts_styles' );



    add_filter('body_class','custom_class_names');
    function custom_class_names($classes) {
        
        // Mobile detects
        switch (true) {         
            case wp_is_mobile() :
                $classes[] = 'is-mobile';                
                break;
            
            default :
                $classes[] = 'not-mobile';                            
                break;
        }

        global $post;
        if ( isset( $post ) ) {
            $classes[] = $post->post_name;
            
            $post_data = get_post($post->post_parent);
            $parent_slug = $post_data->post_name;
            $classes[] = 'parent-'.$parent_slug;
        }        

        return $classes;
    }



    
    add_filter( 'acf/fields/wysiwyg/toolbars' , 'my_toolbars'  );
    function my_toolbars( $toolbars ){
        // Uncomment to view format of $toolbars
        /*
        echo '< pre >';
            print_r($toolbars);
        echo '< /pre >';
        die;
        */

        // Add a new toolbar called "Very Simple"
        // - this toolbar has only 1 row of buttons
        $toolbars['Very Simple' ] = array();
        $toolbars['Very Simple' ][1] = array('link', 'unlink');

        // Edit the "Full" toolbar and remove 'code'
        // - delet from array code from http://stackoverflow.com/questions/7225070/php-array-delete-by-value-not-key
        if( ($key = array_search('code' , $toolbars['Full' ][2])) !== false ){
            unset( $toolbars['Full' ][2][$key] );
        }

		$toolbars['Formatted Text' ] = array();
        $toolbars['Formatted Text' ][1] = array('link', 'unlink', 'bold', 'bullist');

        // Edit the "Full" toolbar and remove 'code'
        // - delet from array code from http://stackoverflow.com/questions/7225070/php-array-delete-by-value-not-key
        if( ($key = array_search('code' , $toolbars['Full' ][2])) !== false ){
            unset( $toolbars['Full' ][2][$key] );
        }

        // remove the 'Basic' toolbar completely
        unset( $toolbars['Basic' ] );

        // return $toolbars - IMPORTANT!
        return $toolbars;
    }


    function get_content_by_id($postid){
        $content_post = get_post($postid);
        $content = $content_post->post_content;
        $content = apply_filters('the_content', $content);
        $content = str_replace(']]>', ']]&gt;', $content);
        echo $content; 
    } 
  
    
// add_action('admin_head', 'custom_admin_css');

// function custom_admin_css() {
//   echo '<style>
//   /* ACF "repeat-horizontal" class, display repeaters in horizontal columns */
//   .repeat-horizontal .acf-repeater tbody {
//       display: flex;
//       flex-direction: row;
//   }
//   .repeat-horizontal .acf-repeater tr.acf-row:not(.acf-clone) {
//       width: 100%;
//   }
//   .repeat-horizontal .acf-repeater tr.acf-row:not(.acf-clone) td.acf-fields {
//       width: 100% !important; /* important is necessary because it gets overwritten on drag&drop  */
//   }
//   </style>';
// }



function work_post_type() {

	$labels = array(
		'name'                  => _x( 'Work', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Work', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Work', 'text_domain' ),
		'name_admin_bar'        => __( 'Work', 'text_domain' ),
		'archives'              => __( 'Work Archives', 'text_domain' ),
		'attributes'            => __( 'Work Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Item:', 'text_domain' ),
		'all_items'             => __( 'All Work', 'text_domain' ),
		'add_new_item'          => __( 'Add New Work', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New Work', 'text_domain' ),
		'edit_item'             => __( 'Edit Work', 'text_domain' ),
		'update_item'           => __( 'Update Work', 'text_domain' ),
		'view_item'             => __( 'View Work', 'text_domain' ),
		'view_items'            => __( 'View Works', 'text_domain' ),
		'search_items'          => __( 'Search Work', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'text_domain' ),
		'items_list'            => __( 'Items list', 'text_domain' ),
		'items_list_navigation' => __( 'Items list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter items list', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'Work', 'text_domain' ),
		'description'           => __( 'Work', 'text_domain' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'thumbnail'),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
        'rewrite'               => array('slug' => 'work'),
	);
	register_post_type( 'work', $args );

}
add_action( 'init', 'work_post_type', 0 );






function work_category() {

	$labels = array(
		'name'                       => _x( 'Work Category', 'Taxonomy General Name', 'text_domain' ),
		'singular_name'              => _x( 'Work Category', 'Taxonomy Singular Name', 'text_domain' ),
		'menu_name'                  => __( 'Work Category', 'text_domain' ),
		'all_items'                  => __( 'Work Categories', 'text_domain' ),
		'parent_item'                => __( 'Work Category Parent', 'text_domain' ),
		'parent_item_colon'          => __( 'Work Category Parent Item:', 'text_domain' ),
		'new_item_name'              => __( 'New work category Name', 'text_domain' ),
		'add_new_item'               => __( 'Add New work category', 'text_domain' ),
		'edit_item'                  => __( 'Edit work category Parent', 'text_domain' ),
		'update_item'                => __( 'Update work category Parent', 'text_domain' ),
		'view_item'                  => __( 'View work category Parent', 'text_domain' ),
		'separate_items_with_commas' => __( 'Separate work category with commas', 'text_domain' ),
		'add_or_remove_items'        => __( 'Add or remove work category', 'text_domain' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'text_domain' ),
		'popular_items'              => __( 'Popular work category', 'text_domain' ),
		'search_items'               => __( 'Search work category', 'text_domain' ),
		'not_found'                  => __( 'Not Found', 'text_domain' ),
		'no_terms'                   => __( 'No work category', 'text_domain' ),
		'items_list'                 => __( 'Work category list', 'text_domain' ),
		'items_list_navigation'      => __( 'Work category list navigation', 'text_domain' ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
	);
	register_taxonomy( 'work-category', array( 'work' ), $args );
}
add_action( 'init', 'work_category', 0 );



function labs_post_type() {

	$labels = array(
		'name'                  => _x( 'Labs', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Labs', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Labs', 'text_domain' ),
		'name_admin_bar'        => __( 'Labs', 'text_domain' ),
		'archives'              => __( 'Labs Archives', 'text_domain' ),
		'attributes'            => __( 'Labs Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Item:', 'text_domain' ),
		'all_items'             => __( 'All labs', 'text_domain' ),
		'add_new_item'          => __( 'Add New labs', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New labs', 'text_domain' ),
		'edit_item'             => __( 'Edit labs', 'text_domain' ),
		'update_item'           => __( 'Update labs', 'text_domain' ),
		'view_item'             => __( 'View labs', 'text_domain' ),
		'view_items'            => __( 'View labss', 'text_domain' ),
		'search_items'          => __( 'Search labs', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'text_domain' ),
		'items_list'            => __( 'Items list', 'text_domain' ),
		'items_list_navigation' => __( 'Items list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter items list', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'Labs', 'text_domain' ),
		'description'           => __( 'Labs', 'text_domain' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'thumbnail'),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
        'rewrite'               => array('slug' => 'labs'),
	);
	register_post_type( 'labs', $args );

}
add_action( 'init', 'labs_post_type', 0 );





function smartwp_remove_wp_block_library_css(){
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-blocks-style' ); // Remove WooCommerce block CSS
    wp_dequeue_style( 'global-styles' ); // REMOVE THEME.JSON
} 
add_action( 'wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100 );

// REMOVE WP EMOJI
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );


if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page();
	
}

function post_remove (){ 
    remove_menu_page('edit.php');
}
add_action('admin_menu', 'post_remove');


function my_remove_admin_menus() {
    remove_menu_page( 'edit-comments.php' );
}
add_action( 'admin_init', 'my_remove_admin_menus' );


function vimeo_markup($iframe){

    preg_match('/src="(.+?)"/', $iframe, $matches);
    $src = $matches[1];

    // Add extra parameters to src and replace HTML.
    $params = array(
        'controls'  => 0,
        'muted' =>1,
        'autoplay' => 1,
        'loop' => 1,
        'autopause' => 0,
        'title' => 0,
        'byline' => 0,
        'portrait' => 0,
        'sidedock' => 0,
        'playsinline' => 1
    );
    $new_src = add_query_arg($params, $src);
    $iframe = str_replace($src, $new_src, $iframe);

    $attributes = 'frameborder="0" allow="autoplay" allowfullscreen class="vimeo-iframe"';
    $iframe = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $iframe);

    // Display customized HTML.
    return $iframe;
    //return '<iframe src="'.$src.'?muted=1&autoplay=1&loop=1&autopause=0&title=0&byline=0&portrait=0&sidedock=0&controls=0" width="640" height="360" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
}