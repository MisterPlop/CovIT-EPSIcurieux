#!/bin/bash
set -e

# On lance d'abord le serveur PostgreSQL en arrière-plan
docker-entrypoint.sh postgres &

# On attend que PostgreSQL soit prêt
until pg_isready; do
  echo "Waiting for PostgreSQL to start..."
  sleep 5
done

# Si la base n'existe pas, on l'initialise avec notre fichier schema.sql
psql -U user -d covit -c "SELECT 1" 2>/dev/null || {
  echo "Initializing database..."
  
  # On exécute d'abord le schéma de la base
  echo "Importing schema from schema.sql..."
  psql -U user -d covit -f /init-scripts/schema.sql
  
  # Si on veut aussi des données de test
  if [ -f "/init-scripts/seed.sql" ]; then
    echo "Importing test data from seed.sql..."
    psql -U user -d covit -f /init-scripts/seed.sql
  fi
}

# On garde le processus PostgreSQL en premier plan
wait %1