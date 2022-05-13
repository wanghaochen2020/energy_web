export function getMockDataUrl(path, language) {
    const pre = '/mock-data/' + language + '/';

    if (path.indexOf('role/list') > -1) {
        path = composeUrl('roles.json');
    } else if (path.indexOf('role/accesslist') > -1) {
        path = composeUrl('access-list.json');
    } else if (path.indexOf('/role') > -1) {
        path = composeUrl('role.json');
    } else if (path.indexOf('user/login') > -1) {
        path = composeUrl('token.json');
    } else if (path.indexOf('user/modifypassword') > -1) {
        path = composeUrl('ok.json');
    } else if (path.indexOf('user/list') > -1) {
        path = composeUrl('users.json');
    } else if (path.indexOf('user') > -1) {
        path = composeUrl('user.json');
    } else if (path.indexOf('user/authorizedlist') > -1) {
        path = composeUrl('authorized-list.json');
    } else if (path.indexOf('readme') > -1) {
        path = composeUrl('README.md');
    } else if (path.indexOf('user/saveroles') > -1) {
        path = composeUrl('ok.json');
    }

    return path;

    function composeUrl(url) {
        return pre + url + '?date=' + new Date().getTime();
    }
}