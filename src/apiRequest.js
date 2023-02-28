import axios from "axios";

const API_URL = "https://citations.mohirbeck.me/api";

export default axios.create({
    baseURL: API_URL,
});

