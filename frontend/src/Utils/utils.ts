export 
const hasItem = <T extends { _id: string }> (collection: T[], item: T) => {
    return collection.findIndex( it => it._id === item._id) > -1
} 

export
const removeItemByFilter = <T extends { _id: string }> (collection: T[], filter: (item: T) => void) => {
    let idx = collection.findIndex(filter)
    if(idx > -1) {
        collection.splice(idx, 1)
    }
}

export
const removeItemById = <T extends { _id: string }> (collection: T[], id: string) => {
    removeItemByFilter(collection, item => item._id === id)
}

export
const removeItem = <T extends { _id: string }> (collection: T[], dataItem: T) => {
    removeItemById(collection, dataItem._id)
}

export
const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// https://gist.github.com/xclusive1111/f47b7340e0ef10dbc8e75e90e7cedc96
export
const foldLeft = <A, B>(xs: Array<A>, zero: B) => (f: (b: B, a: A) => B): B => {
    const len = xs.length;
    if (len === 0) return zero;
    else {
        const head = xs[0];
        const tails = xs.slice(1);
        return foldLeft(tails, f(zero, head))(f);
    }
}

// https://gist.github.com/xclusive1111/f47b7340e0ef10dbc8e75e90e7cedc96
export
const foldRight = <A, B>(xs: Array<A>, zero: B) => (f: (b: B, a: A) => B): B => {
    const len = xs.length;
    if (len === 0) return zero;
    else {
        const last = xs[len - 1];
        const inits = xs.slice(0, len - 1);
        return foldRight(inits, f(zero, last))(f);
    }
}


export
function getCookie(key: string) {
    let ret = null;
    let cookies = [];
    cookies = document.cookie.split('; ');
    for (let it of cookies) {
        let keyvalue = [];
        keyvalue = it.split('=');
        if (keyvalue[0] === key) {
            ret = decodeURI(keyvalue[1]);
        }
    }
    return ret;
}

export 
function getErrorMessage(obj: any) {
    if (obj["message"] !== undefined)
        return obj.message
    else
        return obj
}

export
function toInteger(num: number) {
    if (Number.isInteger(num))
        return num
    else {
        return Math.round(num)
    }
}