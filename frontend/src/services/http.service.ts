import axios, { AxiosInstance } from "axios";

class HttpService {

    private http: AxiosInstance;
    private httpAdmin: AxiosInstance;
    
    constructor() {
        this.http = axios.create({ baseURL: process.env.VUE_APP_BACKEND_URL });
        this.httpAdmin = axios.create({ baseURL: process.env.VUE_APP_BACKEND_URL_ADMIN });
    }

    async checkAdmin(): Promise<boolean> {
        try {
            await this.httpAdmin.get('/admin');
            return true;
        } catch (error) {
            return false;
        }
    }

    async requestAdmin(method: string, url: string, data: object | undefined = undefined) {
        return this.request(method, "admin/" + url, data, true);
    }

    async request(method: string, url: string, data: object | undefined = undefined, admin = false) {
        const http = admin ? this.httpAdmin : this.http;
        console.log(method + " request to " + url, data);
        return http.request({ method, url, data });
    }
}

const httpService = new HttpService();
export default httpService;