export class KeyValueParam {
    key: string;
    value: any;

    constructor(key = 'undefined', value = 'undefined') {
        this.key = key;
        this.value = value;
    }
}
