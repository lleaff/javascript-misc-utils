// @flow

export default function patch(
    obj: {[key:string]: any},
    { filter, transform } : { filter?: (val: any, key: string) => boolean,
                              transform: (val: any, key: string) => any } = {}
): {[key:string]: any} {
    const newObj = Object.create(obj);
    Object.entries(obj).forEach(([key, val]) => {
        if (!filter || filter(val, key)) {
            newObj[key] = transform(val, key);
        }
    });
    return newObj;
}
