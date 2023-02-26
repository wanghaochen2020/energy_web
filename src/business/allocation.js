import { HttpRequestService } from "./base/http-request.service";

const periodUrl = 'api/energyConfig/getPeriod';
const deviceWorkTimeUrl = 'api/energyConfig/getDeviceWorkTime';
const loadDetailUrl = 'api/energyConfig/getLoadDetail';
const boilerConfigUrl = 'api/energyConfig/getBoilerConfigDaily';
const tankConfigUrl = 'api/energyConfig/getTankConfigDaily';
const deviceWorkStateUrl = 'api/energyConfig/getDeviceWorkState';

const heatStorageWeekUrl = 'api/energyConfig/getHeatStorageWeek';
const electricityWeekUrl = 'api/energyConfig/getElectricityWeek';
const configWeekUrl = 'api/energyConfig/getConfigWeek';

const energySavingUrl = 'api/energyConfig/getEnergySaving';
const runningCostUrl = 'api/energyConfig/getRunningCost';
const carbonEmissionUrl = 'api/energyConfig/getCarbonEmission';

export class Allocation {
    static getPeriod() {    
        const options = {
            url:periodUrl
        };
        return HttpRequestService.get(options)
    }

    static getDeviceWorkTime() {    
        const options = {
            url:deviceWorkTimeUrl
        };
        return HttpRequestService.get(options)
    }

    static getLoadDetail() {    
        const options = {
            url:loadDetailUrl
        };
        return HttpRequestService.get(options)
    }

    static getBoilerConfigDaily() {    
        const options = {
            url:boilerConfigUrl
        };
        return HttpRequestService.get(options)
    }

    static getTankConfigDaily() {    
        const options = {
            url:tankConfigUrl
        };
        return HttpRequestService.get(options)
    }

    static getDeviceWorkState() {    
        const options = {
            url:deviceWorkStateUrl
        };
        return HttpRequestService.get(options)
    }

    static getHeatStorageWeek() {    
        const options = {
            url:heatStorageWeekUrl
        };
        return HttpRequestService.get(options)
    }

    static getElectricityWeek() {    
        const options = {
            url:electricityWeekUrl
        };
        return HttpRequestService.get(options)
    }

    static getConfigWeek() {    
        const options = {
            url:configWeekUrl
        };
        return HttpRequestService.get(options)
    }

    static getEnergySaving() {    
        const options = {
            url:energySavingUrl
        };
        return HttpRequestService.get(options)
    }

    static getRunningCost() {    
        const options = {
            url:runningCostUrl
        };
        return HttpRequestService.get(options)
    }

    static getCarbonEmission() {    
        const options = {
            url:carbonEmissionUrl
        };
        return HttpRequestService.get(options)
    }
}



