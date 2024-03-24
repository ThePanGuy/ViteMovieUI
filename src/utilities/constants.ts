class System {
    private _apiUrl = 'http://localhost:8011'

    get apiUrl(): string {
        return this._apiUrl;
    }
}

export class Constants {
    private static system: System = new System();

    public static getApiUrl(): string {
        return this.system.apiUrl;
    }
}