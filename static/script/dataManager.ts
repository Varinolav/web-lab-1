export default class DataManager {
    private _x: string;
    private _y: string;
    private _r: string;


    get r(): string {
        return this._r;
    }

    set r(value: string) {
        this._r = value;
    }

    get x(): string {
        return this._x;
    }

    set x(value: string) {
        this._x = value;
    }

    get y(): string {
        return this._y;
    }

    set y(value: string) {
        this._y = value;
    }

    public getData(): object {
        return {x: this.x, y: this.y, r: this.r};
    }

    public isValid() {
        return this.x !== null && this.r !== null && this.y != null && this.y != "";

    }
}