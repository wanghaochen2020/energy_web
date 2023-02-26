import { HttpRequestService } from "./base/http-request.service";

const loadStatisticUrl = 'api/loadPredict/loadStatistic';
const comparisonUrl = 'api/loadPredict/comparison';


export class LoadPredict {
    static getLoadStatistic(index) {    
        const options = {
            url:loadStatisticUrl,
            params:{index:index}
        };
        return HttpRequestService.get(options)
    }

    static getComparison(index) {    
        const options = {
            url:comparisonUrl,
            params:{index:index}
        };
        return HttpRequestService.get(options)
    }
}



