import React, { useState } from "react";

export const Contact = () => {

    const [status, setStatus] = useState("Submit");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        const { name, email, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
        let response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        });
        setStatus("Submit");
        let result = await response.json();
        alert(result.status);
    };
    return (
        <div>
      
            <h3>
                Contact
            </h3>
            <hr />
            <div class="row">
                <div class="col-md-6 offset-md-3">

                    <form  action="" method="POST">

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
                            <button onSubmit={handleSubmit} class="btn btn-info btn-block" defaultValue={status} type="submit">Send us a message</button>
                    </form>     
           
                </div>
            </div>
        
       </div>
            )
};

export default Contact;