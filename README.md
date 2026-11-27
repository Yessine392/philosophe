# Philosophe

**Deviens philosophe en dialoguant avec les siècles.**

Une application web pour apprendre la philosophie, d'Héraclite à Foucault et de Confucius à Fanon, puis en discuter directement avec les penseurs, incarnés par Claude à partir de leurs œuvres.

## Ce qu'on y trouve

- **Parcours** : 7 parcours, 21 leçons (présocratiques, sagesses antiques, Asie, falsafa et scolastique, raison moderne, XIXe siècle, XXe siècle). Chaque leçon a une méditation à écrire et un quiz.
- **Philosophes** : 55 fiches (vie, idées clés, œuvres, citations, concepts), avec recherche et filtres par époque et tradition.
- **Dialogue** : conversation en streaming avec chaque philosophe. Le persona s'appuie sur ses œuvres réelles, refuse d'inventer des citations, assume ses zones d'ombre et pousse l'élève à penser par lui-même.
- **Agora** : deux philosophes débattent d'une question ; tu interviens en modérateur et tu demandes une synthèse.
- **Concepts** : 68 notions reliées aux penseurs qui les ont forgées.
- **Frise** : toute l'histoire de la pensée d'un seul regard.
- **Carnet** : rangs (de Curieux à Sage), points de sagesse, progression et pensées gardées. Tout est stocké dans le navigateur.

## Lancer le projet

```bash
npm install
cp .env.example .env.local   # puis renseigner ANTHROPIC_API_KEY
npm run dev
```

Ouvrir http://localhost:3000. Sans clé, toute l'application fonctionne sauf les dialogues et l'Agora, qui affichent un message explicatif.

## Technique

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion.
- `src/data/` : tout le contenu (philosophes, concepts, parcours). `npm run check:data` vérifie les liens entre eux.
- `src/lib/persona.ts` : prompts des personas, de l'Agora et de la synthèse.
- `src/app/api/dialogue` et `src/app/api/agora` : routes qui diffusent la réponse de Claude (`claude-opus-5-5` par défaut, réglable via `PHILOSOPHE_MODEL`) avec la réflexion adaptative et le repli automatique côté serveur en cas de refus.
