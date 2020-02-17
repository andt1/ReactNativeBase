import axios from 'axios'
import * as Bluebird from 'bluebird'
import {LOGIN} from '../../../utilities/api'

async function loginApi(req) {
    try {
        const params = {
            name : req.email,
            password : req.password,
            device_id : '123456',
            device : 'Iphone'
        };
        console.log('param = '+JSON.stringify(params));
        console.log('url = '+LOGIN);
        const response = await axios({
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            url: LOGIN,
            data: JSON.stringify(params),
        });
        console.log("status = "+response.status);
        const user = response.status === 200 ? response.data : [];
        return Bluebird.resolve(user);
    } catch (err) {
        return Bluebird.reject(err);
    }
}

export const Api = {
    loginApi
};
