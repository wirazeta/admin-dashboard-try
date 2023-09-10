const axios = require('axios');

const token = "c55395c467dc5f4d8caee3d6b53c5f17d4c24b28976bcf387f1b9feb563e";
const instance = axios.create({
    baseURL:"http://www.devel-filkomub.site",
    headers: {
        "Authorization": `Bearer ${token}`
    }
});

module.exports = {
    instance
}