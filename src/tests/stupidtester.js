import { deepEq } from "../utils/deepequals.js";

export const stupid = () => ({
    expect(vari) {
        this.value = vari;
        return this;
    },
    async expectAsync(promise) {
        this.value = await promise;
        return this;
    },
    describe(x) {
        console.log(x);
        return this;
    },
    toEqual(value) {
        this.predicate = x => deepEq(x, value);
        return this;
    },
    toBeNotNull() {
        this.predicate = x => x !== null && x !== undefined;
        return this;
    },
    toBeNull() {
        this.predicate = x => x === null || x === undefined;
        return this;
    },
    toCoerceTrue() {
        this.predicate = x => x;
        return this;
    },
    toBeTrue() {
        this.predicate = x => x === true;
        return this;        
    },
    toBeFalse() {
        this.predicate = x => x === false;
        return this;
    },
    evaluate() {
        return this.predicate(this.value);
    },
    matches(predicate) {
        this.predicate = predicate;
        return this;
    },
    dBox(message) {
        const l = `\u2588\u2588 ${message} \u2588\u2588`;
        const l1 = `\u2588`.repeat(l.length);
        return this.describe(`\n${l1}`).describe(l).describe(l1);
    }
})