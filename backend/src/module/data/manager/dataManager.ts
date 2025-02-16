import { CovidData } from "../../../resources/types";
import { DataRepository } from "../repository/dataRepository";

export class DataManager {
    private repository: DataRepository;

    constructor() {
        this.repository = new DataRepository();
    }

    async getCovidDataByCountry(country: string): Promise<CovidData[]> {
        return this.repository.getCovidDataByCountry(country);
    }

    async addCovidData(covidData: CovidData): Promise<number> {
        return this.repository.addCovidData(covidData);
    }
    
    async editCovidData(id: number, covidData: CovidData) {
        return this.repository.editCovidData(id, covidData);
    }

    async deleteCovidData(id: number) {
        return this.repository.deleteCovidData(id);
    }
}