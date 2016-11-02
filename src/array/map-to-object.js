export default function arrayMapToObject(arr, cb) {
    let resultObject = {};
    arr.forEach((v, i, o) => {
        const [key, val] = cb(v, i, o);
        resultObject[key] = val;
    });
    return resultObject;
};
