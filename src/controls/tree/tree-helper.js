export const setCheckStatus = (nodes = [], checkedStatus = false) => {
    nodes.forEach((node) => {
        node.checked = checkedStatus;
        setCheckStatus(node.children, checkedStatus);
    });
};

export const expandAll = (nodes = [], expanded = false) => {
    nodes.forEach((node) => {
        node.expanded = expanded;
        expandAll(node.children, expanded);
    });
};

export const clearUrl = (nodes = []) => {
    nodes.forEach((node) => {
        node.url = '';
        clearUrl(node.children);
    });
};

export const getCheckedIds = (nodes = [], ids = []) => {
    nodes.forEach((node) => {
        if (node.checked) {
            ids.push(String(node.id));
        }
        getCheckedIds(node.children, ids);
    });
    return ids;
};

export const checkTargets = (nodes = [], targets = []) => {
    nodes.forEach((node) => {
        if (targets.indexOf(String(node.id)) > -1) {
            node.checked = true;
        }
        checkTargets(node.children, targets);
    });
};

export const checkAll = (nodes = [], checked = true) => {
    nodes.forEach((node) => {
        node.checked = checked;
        checkAll(node.children, checked);
    });
};

export const deselectItems = (nodes = [], collapse = true) => {
    nodes.forEach((node) => {
        if (node.expanded && collapse) {
            node.expanded = false;
        }
        if (node.selected) {
            node.selected = false;
        }
        deselectItems(node.children, collapse);
    });
};

export const checkPath = (path, nodes = [], parent = null, ancestors = [], autoExpand = false) => {
    nodes.forEach((node) => {
        if (node.url === path || node.url === '/#' + path) {
            if (autoExpand) {
                if (parent) {
                    parent.expanded = true;
                }
                ancestors.forEach((pathNode) => pathNode.expanded = true);
            }
            node.selected = true;
        } else {
            checkPath(path, node.children, node, parent ? [...ancestors, parent] : ancestors, autoExpand);
        }
    });
};