import { CovidData } from "../../../resources/types";
import { DataRepository } from "../repository/dataRepository";

export class DataManager {
    private dataRepository: DataRepository;

    constructor() {
        this.dataRepository = new DataRepository();
    }

    async getCovidDataByCountry(country: string): Promise<CovidData[]> {
        return this.dataRepository.getCovidDataByCountry(country);
    }

    async addCovidData(covidData: CovidData): Promise<number> {
        return this.dataRepository.addCovidData(covidData);
    }
    
    async editCovidData(id: number, covidData: CovidData) {
        return this.dataRepository.editCovidData(id, covidData);
    }

    async deleteCovidData(id: number) {
        return this.dataRepository.deleteCovidData(id);
    }
}