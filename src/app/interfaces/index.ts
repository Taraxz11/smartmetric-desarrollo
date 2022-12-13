
export interface IProducts {
    employee: string;
    data:     Datum[];
}

export interface Datum {
    id:           string;
    label:        string;
    address:      string;
    last_measure: number;
    client:       Client;
}

export interface Client {
    rowid: string;
    name:  string;
}
export interface IProduct {
        id      : string,
        label   : string,
        address : string,
        last_measure: 0,
        client: {
           rowid : string,
           name  : string
        }
}

export interface IReading {
    employee_id : string,
    product_id  : string,
    hydrometer  : string,
    date        : number,
    latlong : string,
    photos? : string,
    anomaly : 0|string[],
    description?: string
}

export interface IReadings {
    reading : IReading[]
}