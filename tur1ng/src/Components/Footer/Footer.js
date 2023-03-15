import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "../../styles/footer.css";

const Footer = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_3rg30p3', 'template_zmdldn1', form.current, '5V1-1q9JwtLgoNeM_')
      .then((result) => {
          console.log("message-sent");
          e.target.reset();
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <footer className="footer">
      <div className="foot-container1">
        <div className="foot-about">
          <h3>
            Tur<span>1</span>ng<span>_</span>
          </h3>
          <p className="foot-context">
            Copyright © 2023 by{" "}
            <a href="https://github.com/AtriSukul1508">Atri Sukul. </a>All
            Rights Reserved
          </p>
        </div>

        <div className="foot-contact">
          <div className="contact-set">
            <i className="fa fa-map-marker"></i>
            <p>Address</p>
          </div>
          <div className="contact-set">
            <i className="fa fa-phone"></i>
            <p>Number</p>
          </div>
          <div className="contact-set">
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:123@gmail.com">Mail</a>
            </p>
          </div>
        </div>
        
        <form ref={form} onSubmit={sendEmail} className="form-set">
          <input type="email" name="user_email" placeholder='Email For Newsletter' className='input-area' />
          <input type="submit" value="Join"  className='submit-area' />
          </form>

        <div className="foot-social">
          <h5>Follow On</h5>
            <ul className="social-links-list">
              <li>
                <a href="#">
                  <i class="fab fa-facebook-f icon"></i>{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-twitter icon"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-linkedin-in icon"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-google-plus-g icon"></i>
                </a>
              </li>
            </ul>
        </div>
      </div>
    </footer>

    //     <footer className="footer-distributed">

    //     <div className="footer-left">
    //         <h3>Tur<span>1</span>ng<span>_</span></h3>

    //         <p className="footer-company-name">Copyright © 2023 by <a href="https://github.com/AtriSukul1508">Atri Sukul. </a>All Rights Reserved</p>
    //     </div>

    //     <div className="footer-center">
    //         <div>
    //             <i className="fa fa-map-marker"></i>
    //             <p>Address</p>
    //         </div>

    //         <div>
    //             <i className="fa fa-phone"></i>
    //             <p>Number</p>
    //         </div>
    //         <div>
    //             <i className="fa fa-envelope"></i>
    //             <p><a href="mailto:123@gmail.com">Mail</a></p>
    //         </div>
    //     </div>
    //     <div className="footer-right">
    //         <p className="footer-company-about">
    //             <span>ABOUT</span>
    //             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
    //         </p>
    //         <div className="footer-icons">
    //             <a href="#"><i className="fa fa-facebook"></i></a>
    //             <a href="#"><i className="fa fa-instagram"></i></a>
    //             <a href="#"><i className="fa fa-linkedin"></i></a>
    //             <a href="#"><i className="fa fa-twitter"></i></a>
    //             <a href="#"><i className="fa fa-github"></i></a>
    //         </div>
    //     </div>
    // </footer>
  );
};

export default Footer;
