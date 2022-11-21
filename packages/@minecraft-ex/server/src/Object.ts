export function toString(value: any) {
    let string: string;
    if (value instanceof Array) {
        if (value.length == 0) return "[]";
        string = `(${value.length}) [`;
        value.forEach(element => {
            if (element instanceof Array) string += `Array(${element.length}), `;
            else if (typeof element == "function") string += "f";
            else if (element instanceof Object && element !== null) string += "{...}, ";
            else if (typeof element == "string") string += `'${element}', `;
            else string += `${element}, `;
        });
        string = string.slice(0, string.length - 2) + "]";
    } else if(value instanceof Error) {
        string = `${value.name}${value.message ? `: ${value.message}` : ""}${value.stack?.slice(3) ?? ""}`;
    } else if(typeof value == "function") {
        string = `function ${value.name}() {\n    [native code]\n}\n`;
        Object.entries(value).forEach(element => {
            let [k, v] = element;
            if (v instanceof Array) string += `${k}: Array(${v.length}), `;
            else if (typeof v == "function") string += `${k}: f, `;
            else if (v instanceof Object && v !== null) string += `${k}: {...}, `;
            else if (typeof v == "string") string += `${k}: '${v}', `;
            else string += `${k}: ${v}, `;
        });
    } else if (typeof value == "object") {
        string = "{";
        if (value.__proto__ != undefined && value.__proto__.constructor != Object)
            string = `${value.__proto__.constructor.name} {`;
        for (let k in value) {
            let v = value[k];
            if (v instanceof Array) string += `${k}: Array(${v.length}), `;
            else if (typeof v == "function") string += `${k}: f, `;
            else if (v instanceof Object && v !== null) string += `${k}: {...}, `;
            else if (typeof v == "string") string += `${k}: '${v}', `;
            else string += `${k}: ${v}, `;
        };
        !string.endsWith("{") ? string = string.slice(0, string.length - 2) + "}" : string += "}";
    } else string = `${value}`;
    return string;
}

export function injectObject(value: any = {}) {
    Object.setPrototypeOf(value, Object.assign(Object.getPrototypeOf(value), {
        toString() { return toString(this); }
    }));
}
