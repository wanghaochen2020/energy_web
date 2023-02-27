import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import {
    Login, Master, Password, UserProfile,
    BasicMap, SystemEnergyStation, SystemRefrigerationCenter, SystemSecondPump, SystemSolarPower, SystemSolarWaterHeater,
    AllocationDay, AllocationResult, AllocationWeek,
    AnalyseEnergyStation, AnalyseRefrigerationCenter, AnalyseSecondPump, AnalyseSolarWaterHeater,
    LoadPrediction, GreenPower
} from "../views";
import { NotFound } from "../views/not-found/not-found";
import { Unauthorized } from "../views/unauthorized/unauthorized";

export const routeNames = {
    login: '/login',
    home: '/home',
    unauthorized: '/unauthorized',
    notFound: '/404',
    password: '/password',
    userProfile: '/userprofile',
    basicMap: '/basic-map',
    systemEnergyStation: '/system-energy-station',
    systemRefrigerationCenter: '/system-refrigeration-center',
    systemSecondPump: '/system-second-pump',
    systemSolarPower: '/system-solar-power',
    systemSolarWaterHeater: '/system-solar-water-heater',
    allocationDay: '/allocation-day',
    allocationResult: '/allocation-result',
    allocationWeek: '/allocation-week',
    analyseEnergyStation: '/analyse-energy-station',
    analyseRefrigerationCenter: '/analyse-refrigeration-center',
    analyseSecondPump: '/analyse-second-pump',
    analyseSolarWaterHeater: '/analyse-solar-water-heater',
    greenPower: '/green-power',
    loadPrediction: '/load-prediction'
}

export const routes = <HashRouter>
    <Routes>
        <Route path="/" element={<Master />}>
            <Route index element={<BasicMap />} />
            <Route path={routeNames.home} element={<BasicMap />} />
            <Route path={routeNames.basicMap} element={<BasicMap />} />
            <Route path={routeNames.systemEnergyStation} element={<SystemEnergyStation />} />
            <Route path={routeNames.systemRefrigerationCenter} element={<SystemRefrigerationCenter />} />
            <Route path={routeNames.systemSecondPump} element={<SystemSecondPump />} />
            <Route path={routeNames.systemSolarPower} element={<SystemSolarPower />} />
            <Route path={routeNames.systemSolarWaterHeater} element={<SystemSolarWaterHeater />} />
            <Route path={routeNames.systemRefrigerationCenter} element={<SystemRefrigerationCenter />} />
            <Route path={routeNames.allocationDay} element={<AllocationDay />} />
            <Route path={routeNames.allocationResult} element={<AllocationResult />} />
            <Route path={routeNames.allocationWeek} element={<AllocationWeek />} />
            <Route path={routeNames.analyseEnergyStation} element={<AnalyseEnergyStation />} />
            <Route path={routeNames.analyseRefrigerationCenter} element={<AnalyseRefrigerationCenter />} />
            <Route path={routeNames.analyseEnergyStation} element={<AnalyseEnergyStation />} />
            <Route path={routeNames.analyseSolarWaterHeater} element={<AnalyseSolarWaterHeater />} />
            <Route path={routeNames.analyseSecondPump} element={<AnalyseSecondPump />} />
            <Route path={routeNames.loadPrediction} element={<LoadPrediction />} />
            <Route path={routeNames.greenPower} element={<GreenPower />} />
            <Route path={routeNames.unauthorized} element={<Unauthorized />} />
            <Route path={routeNames.notFound} element={<NotFound />} />
            <Route path={routeNames.password} element={<Password />} />
            <Route path={routeNames.userProfile} element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<Login />}></Route>
        <Route path={routeNames.login} element={<Login />}></Route>
    </Routes>
</HashRouter>;