import React from "react";
import ContactForm from "./ContactForm";

const Footer = () => {
    return(
        <div id="contact">
			<section>
				<h1 style={{textAlign: 'center'}}>Contact</h1>
				<div>
					<hr className="hr-socials"/>
					<ul className="socials">
						<a href="https://www.linkedin.com/in/ferrodmar/" className="footer-link">LinkedIn <ion-icon name="logo-linkedin"></ion-icon></a>
						<a href="https://github.com/eskechivoi" className="footer-link">GitHub <ion-icon name="logo-github"></ion-icon></a>
						<a href="https://app.hackthebox.com/profile/829472" className="footer-link">HackTheBox <ion-icon name="cube-outline"></ion-icon></a>
					</ul>
					<ul className="socials" id="socials-min">
						<a href="https://www.linkedin.com/in/ferrodmar/" className="footer-link"><ion-icon name="logo-linkedin"></ion-icon></a>
						<a href="https://github.com/eskechivoi" className="footer-link"><ion-icon name="logo-github"></ion-icon></a>
						<a href="https://app.hackthebox.com/profile/829472" className="footer-link"><ion-icon name="cube-outline"></ion-icon></a>
					</ul>
					<hr className="hr-socials"/>
				</div>
				<span style={{textAlign: 'center'}}><h1>ferrodrmar@gmail.com</h1></span>
				<hr className="hr-socials"/>
				<ContactForm />
			</section>
		</div>
    );
}

export default Footer;