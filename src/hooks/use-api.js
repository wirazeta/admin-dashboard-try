const axios = require('axios');

const token = "aksesiniuntukmuhambakuyangsetia";
const instance = axios.create({
    baseURL:"http://www.devel-filkomub.site/admin",
    headers: {
        "Authorization": `Bearer ${token}`
    }
});

module.exports = {
    instance
}