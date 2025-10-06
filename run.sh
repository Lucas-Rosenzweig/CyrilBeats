#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# 1. Vérifie si des paquets installés sont différents du "wanted"
# 2. Si oui, lance `npm update` + audit
# 3. Puis exécute le bot (index.js)
# ──────────────────────────────────────────────────────────────

set -euo pipefail

echo "🔍 Vérification des mises à jour NPM compatibles (wanted)…"

# Récupère les paquets obsolètes au format JSON
OUTDATED=$(npm outdated --json 2>/dev/null || echo "{}")

# Vérifie s'il y a des packages avec current != wanted
HAS_UPDATES=$(echo "$OUTDATED" | jq 'to_entries[] | select(.value.current != .value.wanted)' || echo "")

if [[ -n "$HAS_UPDATES" ]]; then
  echo "⬆️  Des paquets peuvent être mis à jour (current ≠ wanted) :"
  echo "$OUTDATED" | jq -r 'to_entries[] | select(.value.current != .value.wanted) | "\(.key): \(.value.current) → \(.value.wanted)"'
  
  echo "🔧 Mise à jour en cours…"
  npm update
  npm audit fix --force || true
  echo "✅ Mises à jour terminées."
else
  echo "✅ Aucun paquet à mettre à jour (tout est à jour selon package.json)."
fi

echo "🚀 Démarrage du bot…"
node index.js