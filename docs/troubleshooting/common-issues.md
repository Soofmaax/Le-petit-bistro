# Problèmes fréquents

## CSP bloque des styles/scripts

- Symptôme: erreurs CSP en console.
- Solution: éviter les styles inline; utiliser classes/CSS vars; voir ANIMATIONS.md.

## Tests flakys

- Symptôme: tests aléatoirement rouges.
- Solution: isoler l'état des mocks (`resetMockState()`), éviter timers réels, mocker librairies lourdes.

## OSV findings persistants

- Symptôme: rapports OSV non vides.
- Solution: bump dépendances, exécuter “Update Lockfile”, commit du `package-lock.json`.

## Déploiement échoue (secrets)

- Symptôme: jobs de déploiement échouent.
- Solution: vérifier secrets (VERCEL_*, NETLIFY_*), et variable `STAGING_URL`.

SmarterLogicWeb — https://smarterlogicweb.com