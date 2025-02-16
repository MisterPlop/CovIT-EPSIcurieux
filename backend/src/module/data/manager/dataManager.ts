import { CovidData } from "../../../resources/types";
import { DataRepository } from "../repository/dataRepository";

export class DataManager {
    private repository: DataRepository;

    constructor() {
        this.repository = new DataRepository();
    }

    async addCovidData(covidData: CovidData) {
        return this.repository.addCovidData(covidData);
    }
    
    async editCovidData(id: number, covidData: CovidData) {
        return this.repository.editCovidData(id, covidData);
    }

    async deleteCovidData(id: number) {
        return this.repository.deleteCovidData(id);
    }
}