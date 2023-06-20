import axios from "axios";

export default axios.create({
    baseURL: "https://back.libressegame.ru",
    timeout: 10000,
    responseType: "json",
    headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});