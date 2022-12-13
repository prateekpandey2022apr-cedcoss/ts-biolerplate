function StorageWrapper(): void {

    type IStorage = {
        [index: string]: any;
    }

    this.storage = window.localStorage;

    this.setStorage = function (newStorage: string) {
        this.storage = newStorage
    }

    this.set = function (key: string, value: IStorage) {
        this.storage.setItem(key, JSON.stringify(value));
    }

    this.get = function (key: string) {
        return JSON.parse(this.storage.getItem(key));
    }
}


export default StorageWrapper;

