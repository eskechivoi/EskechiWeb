import React from "react";

const ContactForm = () => {
    return(
        <div className="contact-form">
            <form method="post" action="https://formspree.io/f/mqkobaro">
                <div className="contact-info">
                    <label>
                        <div>Your name:</div>
                        <input type="text" name="name" placeholder="Your Name"/>
                    </label>
                    <div style={{display: 'inline', marginInline: '5px'}}></div>
                    <label>
                        <div>Your email:</div>
                        <input type="email" name="name" placeholder="youremail@mail.com"/>
                    </label>
                </div>
                <div id="msg-label">Message:</div>
                <textarea name="Message" id="email-msg"></textarea>
                <div className="submit">
                    <input type="submit" value="Send"/>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;