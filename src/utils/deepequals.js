export const deepEq = (a, b) => {
    if(Array.isArray(a)) {
        if(!Array.isArray(b)) return false;
        if(a.length === b.length && a.every((x, i) => deepEq(b[i], x))) {
            return true;
        } 
    }
    if(typeof a !== typeof b) return false;
    if(typeof a === 'object') {
        const valuesA = Object.values(a);
        const valuesB = Object.values(b);
        return deepEq(valuesA, valuesB);
    } else {
        return a === b;
    }
}