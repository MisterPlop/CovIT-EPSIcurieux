-- schema.sql
CREATE TABLE IF NOT EXISTS covid19 (
    id SERIAL PRIMARY KEY,
    date_reported DATE NOT NULL,
    confirmed_cases INTEGER NOT NULL DEFAULT 0,
    deaths_reported INTEGER NOT NULL DEFAULT 0,
    recovered_cases INTEGER NOT NULL DEFAULT 0,
    active_cases INTEGER NOT NULL DEFAULT 0,
    new_cases INTEGER NOT NULL DEFAULT 0,
    new_deaths INTEGER NOT NULL DEFAULT 0,
    new_recovered INTEGER NOT NULL DEFAULT 0,
    deaths_per_100_cases DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    recovered_per_100_cases DECIMAL(5,2) NOT NULL DEFAULT 0.0
);

-- Index sur la date pour optimiser les recherches temporelles
CREATE INDEX IF NOT EXISTS idx_covid19_date ON covid19(date_reported);