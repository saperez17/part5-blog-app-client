const saveToLocal = async(objName, objectBody) => {
    if(window.localStorage.getItem(objName) === null){
        window.localStorage.removeItem(objName);
    }
    window.localStorage.setItem(objName, JSON.stringify(objectBody));
};

const removeFromLocal = (objName) => {
    if(window.localStorage.getItem(objName) !== null){
        window.localStorage.removeItem(objName);
    }
};

const getFromLocal = (objName) => {
    if(window.localStorage.getItem(objName) === null){
        return null;
    }
    const step = JSON.parse(window.localStorage.getItem(objName));
    return step;
};

export {
    saveToLocal,
    getFromLocal,
    removeFromLocal
};