<!DOCTYPE html>
<html <?php language_attributes(); ?> prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <title><?php wp_title(''); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">     
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <meta name="format-detection" content="telephone=no"> 
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <!-- <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-16x16.png"> -->
    <!-- <link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/favicon/site.webmanifest"> -->
    <!-- <link rel="mask-icon" href="<?php echo get_template_directory_uri(); ?>/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c"> -->
    <!-- <meta name="theme-color" content="#ffffff"> -->
    <?php wp_head();?>
</head>
<body data-barba="wrapper">
<div data-barba="container" data-barba-namespace="<?php 
    if(is_home() || is_front_page()){
        echo "home";
    }elseif(is_tax('work-category') || is_post_type_archive( 'work' )){   
        echo "work";     
    }elseif(is_singular('work')){   
        echo "single-work"; 
    }elseif(is_post_type_archive( 'labs' )){   
        echo "labs";      
    }elseif(is_singular('labs')){   
        echo "single-labs";   
    }elseif(is_page('info')){   
        echo 'info';                  
    }else{
        //echo $post->post_name;
        echo 'default';
    }    
?>"> 
<header class="site-header main-header">
    <h1 class="site-title"><a href="<?php echo home_url();?>"><?php bloginfo('name');?></a></h1>
    <?php $menuArgs = array(
        'container'         => 'false',
        'menu'              => 'Main Menu',
    ); 
    wp_nav_menu($menuArgs); ?>
</header>
<main>
        
