-- schema.sql
CREATE TABLE IF NOT EXISTS covid19 (
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    date DATE NOT NULL,
    population INTEGER NOT NULL DEFAULT 0,
    cases INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 0,
    recovered INTEGER NOT NULL DEFAULT 0,
    deaths INTEGER NOT NULL DEFAULT 0
);

-- Index sur la date pour optimiser les recherches temporelles
CREATE INDEX IF NOT EXISTS idx_covid19_date ON covid19(date);