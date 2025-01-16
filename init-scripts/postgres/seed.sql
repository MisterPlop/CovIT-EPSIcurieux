-- seed.sql
INSERT INTO covid19 (
    date_reported,
    confirmed_cases,
    deaths_reported,
    recovered_cases,
    active_cases,
    new_cases,
    new_deaths,
    new_recovered,
    deaths_per_100_cases,
    recovered_per_100_cases
) VALUES 
    ('2024-01-01', 15000, 200, 14000, 800, 50, 2, 100, 1.33, 93.33),
    ('2024-01-02', 15050, 202, 14100, 748, 50, 2, 100, 1.34, 93.69),
    ('2024-01-03', 15150, 205, 14200, 745, 100, 3, 100, 1.35, 93.73),
    ('2024-01-04', 15200, 208, 14300, 692, 50, 3, 100, 1.37, 94.08),
    ('2024-01-05', 15300, 210, 14400, 690, 100, 2, 100, 1.37, 94.12),
    ('2024-01-06', 15400, 215, 14500, 685, 100, 5, 100, 1.40, 94.16),
    ('2024-01-07', 15450, 220, 14600, 630, 50, 5, 100, 1.42, 94.50);

-- Vérification des données insérées
SELECT 
    to_char(date_reported, 'YYYY-MM-DD') as date,
    confirmed_cases,
    deaths_reported,
    recovered_cases,
    active_cases
FROM covid19 
ORDER BY date_reported DESC 
LIMIT 5;