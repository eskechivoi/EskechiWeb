<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=devide-width, initial-scale=1.0">
		<title>Eskechivoi</title>
		<!-- FONT AWESOME-->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
		<!-- FONT GOOGLE - JOSEFIN SANS-->
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
		<!-- BOOTSTRAP 5 -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
  		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
		<!-- CUSTOM CSS-->
		<link rel="stylesheet" href="css/index.css">
	</head>
    <body data-bs-spy="scroll" data-bs-target=".navbar" data-bs-offset="50">
		<link rel="stylesheet" type="text/css" href="css/nav.css">
	    <div class="center">
	        <ul class="navigation">
	            <li><a href="#home">Home</a></li>
	            <li><a href="#articles">Articles</a></li>
	            <li><a href=https://www.youtube.com/@centralpodcastunit9808>Podcast</a></li>
	            <li><a href="#contact">Contact</a></li>
        	</ul>
    	</div>
		<div class="index-body">
			<div class="container-fluid" id="home">
  				<div class="row justify-content-center">
				  <div class="col-md-6" style="padding: 90px 0;">
						<h1> Hi! I am Fernando Rodríguez</h1>
						<h2> I love cybersecurity, so in my page you will find a lot of interesting cybersecurity topics! </h2>
    				</div>
					<div class="col-sm-1"></div>
				  	<div class="col-md-3">
      					<image src="img/foto_linkedin.jpg" width="271" height="360" style="border-radius: 12px">
    				</div>
  				</div>
				<div class="row justify-content-center">
					<div class="col-sm-2"></div>
					<div class="col-lg-8">
						<div class="about">
							<h1 style="display:flex; justify-content:center; padding: 8px;"><u>About me</u></h1>
							<p style="padding: 8px;">I am an IT student at the University of Valladolid, but I also like to undertake my own
							projects. Currently, I am focused on developing tools to secure computer systems 
							and networks. Here is a list of the projects I have developed and worked on: </p>
							<ul>
								<li>Java library for key storage based on symmetric cryptography. Project link: <a href=https://github.com/eskechivoi/JKeyStore>Link to GitHub project</a></li>
								<li>I train daily in cybersecurity practices, performing different challenges and machines on HTB! Here is my  <a href=https://app.hackthebox.com/profile/829472>Hack The Box Profile</a>.</li>
								<li>I publish articles about cibersecurity in this website!</li>
								<li>I have full stack development skills, this website is completely designed by me!</li>
								<li>I record a weekly technology podcast called CentralPodcastUnit. </li>
							</ul>
							<p style="padding: 8px;">Also, I am starting to research about security in embedded systems and IoT, since it is a booming
							sector where cybersecurity is a fundamental part.</p>
						</div>
					</div>
					<div class="col-sm-2"></div>
				</div>
			</div>
			<?php
				include("articles.php");
				include("footer.php");
			?>
		</div>
	</body>
</html>