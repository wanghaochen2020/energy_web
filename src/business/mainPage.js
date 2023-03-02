import { HttpRequestService } from "./base/http-request.service";

const atmosphereUrl = 'api/basicMap/getAtmosphere';
const kekongUrl = 'api/basicMap/getKekong';


export class MainPage {
    static getAtmosphere() {    
        const options = {
            url:atmosphereUrl
        };
        return HttpRequestService.get(options)
    }

    static getKekong() {    
        const options = {
            url:kekongUrl
        };
        return HttpRequestService.get(options)
    }
}