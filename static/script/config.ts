export default class Config {
    state: object

    constructor(state = {}) {
        this.state = state;
    }

    set(key: any, value: any): void {
        this.state[key] = value;
    }

    get(key: any): any {
        return this.state[key];
    }

}