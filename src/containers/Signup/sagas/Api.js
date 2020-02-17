import axios from 'axios'
import * as BlueBird from 'bluebird'
import {SIGNUP} from '../../../utilities/api';

async function signupApi(req) {
    console.log("ghe qua "+JSON.stringify(req));
    try {
        const param = {
            name : req.name,
            email : req.email,
            password : req.password,
            mobile_no : '01235852124',
            device_id : '123456',
            device : 'Iphone'
        };
        console.log('param = '+JSON.stringify(param));
        console.log('url = '+SIGNUP);
        const response  = await axios({
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            url : SIGNUP,
            data : JSON.stringify(param)
        });
        console.log(response);
        const user = response.status === 200 ? response.data : [];
        return BlueBird.resolve(user);
    } catch (e) {
        console.log("vai dai "+e);
        return BlueBird.reject(e);
    }
}

export const Api = {
    signupApi
};
