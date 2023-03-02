export const PAGEDATA = {
    EnergyOnlineRate: "energy_online_rate",              //能源站设备在线率
	EnergyBoilerPower: "energy_boiler_power",          //能源站锅炉功率
	EnergyPowerConsumptionToday: "energy_power_consumption_today",  //能源站今日总耗能
	EnergyBoilerRunningNum: "energy_boiler_running_num",       //能源站锅炉运行数目
	EnergyTankRunningNum: "energy_tank_running_num",         //能源站蓄热水箱运行数目
	EnergyHeatSupplyToday: "energy_heat_supply_today",        //能源站今日总供热量
	EnergyHeatStorageAndRelease: "energy_heat_storage_and_release", //能源站每日各小时水箱蓄放热量
	EnergyBoilerEnergyCost: "energy_boiler_energy_cost",       //能源站每日各小时锅炉能耗
	EnergyBoilerEfficiencyDay: "energy_boiler_efficiency_day",    //能源站每日各小时锅炉效率
	EnergyWatertankEfficiencyDay: "energy_watertank_efficiency_day", //能源站每日各小时蓄热水箱效率
	EnergyEfficiencyDay: "energy_efficiency_day",           //能源站每日各小时效率
	EnergyCarbonDay: "energy_carbon_day",               //能源站每日各小时碳排
	EnergyCarbonMonth: "energy_carbon_month",             //能源站每月各天碳排总和
	EnergyCarbonYear: "energy_carbon_year",              //能源站每年各月碳排总和
	EnergyBoilerPayloadDay: "energy_boiler_payload_day",       //能源站每日各小时锅炉负载
	EnergyBoilerPayloadMonth: "energy_boiler_payload_month",     //能源站每月各天平均锅炉负载
	EnergyBoilerPayloadYear: "energy_boiler_payload_year",      //能源站每年各月平均锅炉负载
	EnergyAlarmToday: "energy_alarm_today",              //能源站今日告警
	EnergyAlarmNumToday: "energy_alarm_num_today",              //能源站今日告警次数
	EnergyBoilerPowerConsumptionToday1: "energy_boiler_power_consumption_today1", //能源站锅炉1今日耗能
	EnergyBoilerPowerConsumptionToday2: "energy_boiler_power_consumption_today2", //能源站锅炉2今日耗能
	EnergyBoilerPowerConsumptionToday3: "energy_boiler_power_consumption_today3", //能源站锅炉3今日耗能
	EnergyBoilerPowerConsumptionToday4: "energy_boiler_power_consumption_today4", //能源站锅炉4今日耗能

	EnergyBoilerOutT1:"ZLZ.%E9%94%85%E7%82%89%E5%AE%9E%E9%99%85%E5%87%BA%E6%B0%B4%E6%B8%A9%E5%BA%A61",//锅炉1实际出水温度
	EnergyBoilerOutT2:"ZLZ.%E9%94%85%E7%82%89%E5%AE%9E%E9%99%85%E5%87%BA%E6%B0%B4%E6%B8%A9%E5%BA%A62",
	EnergyBoilerOutT3:"ZLZ.%E9%94%85%E7%82%89%E5%AE%9E%E9%99%85%E5%87%BA%E6%B0%B4%E6%B8%A9%E5%BA%A63",
	EnergyBoilerOutT4:"ZLZ.%E9%94%85%E7%82%89%E5%AE%9E%E9%99%85%E5%87%BA%E6%B0%B4%E6%B8%A9%E5%BA%A64",
	EnergyBoilerInT1:"ZLZ.%E9%94%85%E7%82%89%E5%AE%9E%E9%99%85%E5%9B%9E%E6%B0%B4%E6%B8%A9%E5%BA%A61",//锅炉1实际进水温度
	EnergyBoilerInT2:"ZLZ.%E9%94%85%E7%82%89%E5%AE%9E%E9%99%85%E5%9B%9E%E6%B0%B4%E6%B8%A9%E5%BA%A62",
	EnergyBoilerInT3:"ZLZ.%E9%94%85%E7%82%89%E5%AE%9E%E9%99%85%E5%9B%9E%E6%B0%B4%E6%B8%A9%E5%BA%A63",
	EnergyBoilerInT4:"ZLZ.%E9%94%85%E7%82%89%E5%AE%9E%E9%99%85%E5%9B%9E%E6%B0%B4%E6%B8%A9%E5%BA%A64",
	EnergyBoilerRun1:"ZLZ.%E7%B3%BB%E7%BB%9F%E8%BF%90%E8%A1%8C%E4%B8%AD1",//锅炉1运行状态
	EnergyBoilerRun2:"ZLZ.%E7%B3%BB%E7%BB%9F%E8%BF%90%E8%A1%8C%E4%B8%AD2",
	EnergyBoilerRun3:"ZLZ.%E7%B3%BB%E7%BB%9F%E8%BF%90%E8%A1%8C%E4%B8%AD3",
	EnergyBoilerRun4:"ZLZ.%E7%B3%BB%E7%BB%9F%E8%BF%90%E8%A1%8C%E4%B8%AD4",
	EnergyTankInT:"ZLZ.OUTPUT_T4",//水箱进水温度
	EnergyTankOutT:"ZLZ.OUTPUT_T3",//水箱出水温度

	EnergyPumpState:["ZLZ.A%E6%B3%B5%E8%BF%90%E8%A1%8C1",//ZLZ.A泵运行1
	"ZLZ.B%E6%B3%B5%E8%BF%90%E8%A1%8C1",//ZLZ.B泵运行1
	"ZLZ.A%E6%B3%B5%E8%BF%90%E8%A1%8C2",//ZLZ.A泵运行2
	"ZLZ.B%E6%B3%B5%E8%BF%90%E8%A1%8C2",//ZLZ.B泵运行2
	"ZLZ.A%E6%B3%B5%E8%BF%90%E8%A1%8C1",//ZLZ.A泵运行3
	"ZLZ.B%E6%B3%B5%E8%BF%90%E8%A1%8C1",//ZLZ.B泵运行3
	"ZLZ.A%E6%B3%B5%E8%BF%90%E8%A1%8C1",//ZLZ.A泵运行4
	"ZLZ.B%E6%B3%B5%E8%BF%90%E8%A1%8C1",//ZLZ.B泵运行4
	"ZLZ.RUN_P1",//蓄热循环泵
	"ZLZ.RUN_P2",//蓄热循环泵
	"ZLZ.RUN_P3",//蓄热循环泵
	"ZLZ.RUN_P4",//放热循环泵
	"ZLZ.RUN_P5",//放热循环泵
	"ZLZ.RUN_P6",//放热循环泵
	"ZLZ.RUN_P7",//供热水泵
	"ZLZ.RUN_P8",//供热水泵
	"ZLZ.RUN_P9",],//供热水泵

	EnergyDVState:[
		"ZLZ.OPEN_V1",
		"ZLZ.OPEN_V2",
		"ZLZ.OPEN_V3",
		"ZLZ.OPEN_V5",
		"ZLZ.OPEN_V8",
		"ZLZ.OPEN_V9",
		"ZLZ.OPEN_V11",
		"ZLZ.OPEN_V10",
		"ZLZ.OUTPUT_T29",//DVT-1开度
		"ZLZ.OUTPUT_T30",//DVT-2开度
	],

	ColdPowerMin: "cold_power_min",               //制冷中心当分钟功率
	ColdEnergyCostToday: "cold_energy_cost_today",       //制冷中心今日能耗
	ColdMachineRunningNum: "cold_machine_running_num",     //制冷中心制冷机运行台数
	ColdCoolingWaterInT: "cold_cooling_water_InT",       //制冷中心冷却水进水温度
	ColdCoolingWaterOutT: "cold_cooling_water_OutT",      //制冷中心冷却水出水温度
	ColdRefrigeratedWaterInT: "cold_refrigerated_water_InT",  //制冷中心冷冻水进水温度
	ColdRefrigeratedWaterOutT: "cold_refrigerated_water_OutT", //制冷中心冷冻水出水温度
	ColdMachinePowerMin: "cold_machine_power_min",       //制冷中心制冷机当分钟功率
	ColdEnergyCostDay: "cold_energy_cost_day",         //制冷中心每日各小时能耗
	ColdCarbonDay: "cold_carbon_day",              //制冷中心每日各小时碳排
	ColdCarbonMonth: "cold_carbon_month",            //制冷中心每月各天碳排总和
	ColdCarbonYear: "cold_carbon_year",             //制冷中心每年各月碳排总和
	ColdAlarmToday: "cold_alarm_today",             //制冷中心今日告警
	ColdAlarmNumToday: "cold_alarm_num_today",         //制冷中心今日告警次数

	ColdPumpState:[
		"ZLZ.Z_RUN_P1209",
		"ZLZ.Z_RUN_P1210",
		"ZLZ.Z_RUN_P1211",
		"ZLZ.Z_RUN_P1212",
		"ZLZ.Z_RUN_P1213",
		"ZLZ.Z_RUN_P1204",
		"ZLZ.Z_RUN_P1205",
		"ZLZ.Z_RUN_P1206",
		"ZLZ.Z_RUN_P1207",
		"ZLZ.Z_RUN_P1208",
		"ZLZ.Z_RUN_P1214",
		"ZLZ.Z_RUN_P1215",
		"ZLZ.Z_RUN_P1216",
		"ZLZ.Z_RUN_P1217",
		"ZLZ.Z_RUN_P1218",
		"ZLZ.Z_RUN_P1219",
	],

	ColdMachineRun:[
		"ZLZ.Z_LX1_%E5%90%AF%E5%81%9C",
		"ZLZ.Z_LX2_%E5%90%AF%E5%81%9C",
		"ZLZ.Z_L_%E5%90%AF%E5%81%9C"
	],
	ColdMachinePowerMinList: [
		"cold_machine_power_min1",       //制冷中心制冷机1当分钟功率
		"cold_machine_power_min2",       //制冷中心制冷机2当分钟功率
		"cold_machine_power_min3"		 //制冷中心制冷机3当分钟功率
	],
	ColdMachineCoolInT: [
		"ZLZ.Z_LX1_%E5%86%B7%E5%8D%B4%E8%BF%9B%E6%B0%B4%E6%B8%A9%E5%BA%A6",       //制冷中心制冷机1冷却进水温度
		"ZLZ.Z_LX2_%E5%86%B7%E5%8D%B4%E8%BF%9B%E6%B0%B4%E6%B8%A9%E5%BA%A6",
		"ZLZ.Z_L_%E5%86%B7%E5%8D%B4%E8%BF%9B%E6%B0%B4%E6%B8%A9%E5%BA%A6"
	],
	ColdMachineCoolOutT: [
		"ZLZ.Z_LX1_%E5%86%B7%E5%8D%B4%E5%87%BA%E6%B0%B4%E6%B8%A9%E5%BA%A6",       //制冷中心制冷机1冷却出水温度
		"ZLZ.Z_LX2_%E5%86%B7%E5%8D%B4%E5%87%BA%E6%B0%B4%E6%B8%A9%E5%BA%A6",
		"ZLZ.Z_L_%E5%86%B7%E5%8D%B4%E5%87%BA%E6%B0%B4%E6%B8%A9%E5%BA%A6"
	],
	ColdMachineColdInT: [
		"ZLZ.Z_LX1_%E5%86%B7%E5%86%BB%E8%BF%9B%E6%B0%B4%E6%B8%A9%E5%BA%A6",       //制冷中心制冷机1冷冻进水温度
		"ZLZ.Z_LX2_%E5%86%B7%E5%86%BB%E8%BF%9B%E6%B0%B4%E6%B8%A9%E5%BA%A6",
		"ZLZ.Z_L_%E5%86%B7%E5%86%BB%E8%BF%9B%E6%B0%B4%E6%B8%A9%E5%BA%A6"
	],
	ColdMachineColdOutT: [
		"ZLZ.Z_LX1_%E5%86%B7%E5%86%BB%E5%87%BA%E6%B0%B4%E6%B8%A9%E5%BA%A6",       //制冷中心制冷机1冷冻出水温度
		"ZLZ.Z_LX2_%E5%86%B7%E5%86%BB%E5%87%BA%E6%B0%B4%E6%B8%A9%E5%BA%A6",
		"ZLZ.Z_L_%E5%86%B7%E5%86%BB%E5%87%BA%E6%B0%B4%E6%B8%A9%E5%BA%A6"
	],
	ColdMachinePresure: [
		"ZLZ.Z_LX1_%E5%86%B7%E5%87%9D%E5%99%A8%E5%86%B7%E5%AA%92%E5%8E%8B%E5%8A%9B",       //制冷中心制冷机1冷凝器冷媒压力
		"ZLZ.Z_LX2_%E5%86%B7%E5%87%9D%E5%99%A8%E5%86%B7%E5%AA%92%E5%8E%8B%E5%8A%9B",
		"ZLZ.Z_L_%E5%86%B7%E5%87%9D%E5%99%A8%E5%86%B7%E5%AA%92%E5%8E%8B%E5%8A%9B"
	],

	PumpPowerMin: "pump_power_min",       //二次泵站功率
	PumpPowerToday: "pump_power_today",     //二次泵站今日能耗
	PumpEnergyCostDay: "pump_energy_cost_day", //二次泵站每日各小时能耗
	PumpRunningState1: "pump_running_state1",  //二次泵站泵运行状态
	PumpRunningState2: "pump_running_state2",  //二次泵站泵运行状态
	PumpRunningState3: "pump_running_state3",  //二次泵站泵运行状态
	PumpRunningState4: "pump_running_state4",  //二次泵站泵运行状态
	PumpRunningState5: "pump_running_state5",  //二次泵站泵运行状态
	PumpRunningState6: "pump_running_state6",  //二次泵站泵运行状态
	PumpHeatHour1: "pump_heat_hour1",      //二次泵站当小三每分钟环路1输热量
	PumpHeatHour2: "pump_heat_hour2",      //二次泵站当小三每分钟环路2输热量
	PumpEHR1: "pump_EHR1",            //二次泵站环路1每日EHR
	PumpEHR2: "pump_EHR2",            //二次泵站环路2每日EHR
	PumpAlarmToday: "pump_alarm_today",     //二次泵站今日告警
	PumpAlarmNumToday: "pump_alarm_num_today", //二次泵站今日告警次数
	PumpCarbonYear: "pump_carbon_year",     //二次泵站每年各月碳排总和

	SolarWaterBoilerPowerConsumptionToday: "solar_water_boiler_power_comsumption_today", //太阳能热水电加热器今日总耗电量
	SolarWaterHeatCollecterInT: "solar_water_heat_collecter_in_temp",         //太阳能热水集热器进口温度
	SolarWaterHeatCollecterOutT: "solar_water_heat_collecter_out_temp",        //太阳能热水集热器出口温度
	SolarWaterJRQT: "solar_water_JRQ_temp",                       //太阳能热水加热器温度
	SolarWaterHeatCollectionToday: "solar_water_heat_collection_today",          //太阳能热水今日总集热量
	SolarWaterPumpRunningNum: "solar_water_pump_running_num",               //太阳能热水水泵运行数目
	SolarWaterHeatCollectionHour: "solar_water_heat_collection_hour",           //太阳能热水集热量当小时每分钟
	SolarWaterHeatCollectionDay: "solar_water_heat_collection_day",            //太阳能热水集热量当日每小时
	SolarWaterHeatCollectionMonth: "solar_water_heat_collection_month",          //太阳能热水集热量每月各天总和
	SolarWaterHeatCollectionYear: "solar_water_heat_collection_year",           //太阳能热水集热量每年各月总和
	SolarWaterBoilerPowerConsumptionHour: "solar_water_boiler_power_comsumption_hour",  //太阳能热水电加热器耗电量当小时每分钟
	SolarWaterBoilerPowerConsumptionDay: "solar_water_boiler_power_comsumption_day",   //太阳能热水电加热器耗电量当日每小时
	SolarWaterHeatEfficiencyDay: "solar_water_heat_efficiency_day",            //太阳能热水集热效率当日每小时
	SolarWaterHeatEfficiencyMonth: "solar_water_heat_efficiency_month",          //太阳能热水集热效率每月各天
	SolarWaterHeatEfficiencyYear: "solar_water_heat_efficiency_year" ,          //太阳能热水集热效率每年各月
	SolarWaterGuaranteeRateDay: "solar_water_guarantee_rate", //太阳能热水保证率当日每小时
	SolarWaterGuaranteeRateMonth: "solar_water_guarantee_month",                //太阳能热水保证率每月各天
	SolarWaterGuaranteeRateYear: "solar_water_guarantee_year",                 //太阳能热水保证率每年各月
}