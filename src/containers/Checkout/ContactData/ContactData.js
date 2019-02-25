import React, {Component} from 'react';
import './ContactData.css';
import Button from "../../../components/UI/Button/Button";


class ContactData extends Component {
    render() {
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className="Input" type="text" name="name" placeholder="Your Name"/>
                    <input className="Input" type="email" name="email" placeholder="Your Mail"/>
                    <input className="Input" type="text" name="street" placeholder="Street"/>
                    <input className="Input" type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;
