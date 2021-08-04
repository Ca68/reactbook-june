import React, { useState } from "react";
import emailjs from "emailjs-com";
//import {SERVICE_ID, TEMPLATE_ID, USER_ID} from '.env'

export const Contact = () => {

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_USER_ID)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }
    return (
        <div>

            <h3>
                Contact
            </h3>
            <hr />
            <div class="row">
                <div class="col-md-6 offset-md-3">

                    <form onSubmit={sendEmail} action="" method="POST">

                        <div class="form-group">

                            <input type="email" class="form-control" name="email" placeholder="Email" />
                        </div>
                        <div class="form-group">
                            <select class="form-control" name="inquiry" id="">
                                <option disabled selected>Please choose one option</option>
                                <option value="cheap">Starting $500+</option>
                                <option value="expensive">Starting $1,000+</option>
                                <option value="luxury">Starting $5000+</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" name="message" id="" cols="30" rows="10"></textarea>
                        </div>
                        <button class="btn btn-info btn-block" type="submit">Send us a message</button>
                    </form>

                </div>
            </div>

        </div>
    )
};

export default Contact;