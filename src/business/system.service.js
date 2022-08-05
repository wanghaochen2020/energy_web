import { TextService } from '../utils';
import { HttpRequestService } from './base/http-request.service';

const getApi = (url) => 'api/system/' + url;
const apis = {
  readMe: getApi('readme')
}
export class SystemBusiness {
  static getReadMe() {
    const options = {
      url: apis.readMe
    };
    return HttpRequestService.get(options);
  }

  static getSystemMenus() {
    const menusZHCN = [
      { id: '2', name: '基础设施地图', url: '/basic-map', icon: 'fa fa-cog', children: [] },
      {
        id: '1', name: '系统层', icon: 'fa fa-user', iconColor: '#bf9a44',
        children: [
          { id: '11', name: '能源站', url: '/system-energy-station' },
          { id: '12', name: '制冷中心', url: '/system-refrigeration-center' },
          { id: '14', name: '二次泵站', url: '/system-second-pump' },
          { id: '14', name: '太阳能热水', url: '/system-solar-water-heater' },
          { id: '14', name: '太阳能发电', url: '/system-solar-power' },
        ]
      },
      {
        id: '3', name: '能效分析', icon: 'fa fa-television', iconColor: '#4f63f5', children: [
          { id: '11', name: '能源站', url: '/analyse-energy-station' },
          { id: '14', name: '制冷中心', url: '/analyse-refrigeration-center' },
          { id: '14', name: '二次泵站', url: '/analyse-second-pump' },
          { id: '15', name: '太阳能热水', url: '/analyse-solar-water-heater' }
        ]
      },
      { id: '4', name: '负荷预测', url: '/load-prediction', icon: 'fa fa-calendar-check-o', iconColor: '#24829f' },
      { id: '5', name: '绿电', url: 'green-power', children: [] },
      {
        id: '6', name: '能源调配', children: [
          { id: '11', name: '日调配方案', url: '/allocation-day' },
          { id: '14', name: '周调配方案', url: '/allocation-week' },
          { id: '15', name: '调配效果', url: '/allocation-result' }
        ]
      }
    ];

    const menusENUS = [
      {
        id: '1', name: 'Users Settings', icon: 'fa fa-user', iconColor: '#bf9a44', children: [
          {
            id: '11', name: 'Users', url: '/users'
          },
          { id: '12', name: 'Roles', url: '/roles' }, { id: '13', name: 'User Roles', url: '/userroles' },
          { id: '14', name: 'Modify Password', url: '/password' }, { id: '15', name: 'My Profile', url: '/userprofile' }
        ]
      },
      { id: '2', name: 'System Settings', icon: 'fa fa-cog', children: [
        { id: '21', name: 'Menus Settings Long Name Long Name' }, { id: '22', name: 'Login logs' },
        { id: '23', name: 'Unauthoried test', url: '/authorizationtest' }
      ]},
      { id: '3', name: 'News', icon: 'fa fa-television', iconColor: '#4f63f5' },
      { id: '4', name: 'Working Log', icon: 'fa fa-calendar-check-o', iconColor: '#24829f' },
      { id: '5', name: 'Demo', children: [
        { id: '51', name: 'Demo' }, { id: '52', name: 'Demo' }, { id: '53', name: 'Demo' },
        { id: '54', name: 'Demo' }, {
          id: '515', name: 'Demo', children: [
            { id: '11', name: 'Demo' }, { id: '12', name: 'Demo' }, { id: '13', name: 'Demo' },
            { id: '14', name: 'Demo' }, { id: '15', name: 'Demo' }
          ]
        }
      ]}
    ];

    return TextService.getLanguage().name === 'en-us' ? menusENUS: menusZHCN;
  }
}
