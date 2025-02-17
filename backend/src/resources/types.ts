export interface CovidData {
    country: string;
    date: string;
    population: number;
    cases: number;
    active: number;
    recovered: number;
    deaths: number;
}

export interface User {
    id: number;
    username: string;
    password_hash: string;
    profil: string;
}

export interface UserLogin {
    username: string;
    password: string;
    profil: string;
}
