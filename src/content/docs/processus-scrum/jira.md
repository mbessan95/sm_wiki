---
title: "Retranscription dans Jira"
description: "Alignement du processus avec Jira."
---

06 — Jira

## Retranscription dans Jira

On utilise trois niveaux de tickets. Chaque niveau a un rôle précis et des règles de remplissage à respecter.

Pourquoi structurer nos tickets ?

Travailler avec des niveaux de tickets clairs nous permet d'avancer de manière **granulaire et organisée**. Chaque sujet est découpé à la bonne maille — ni trop gros pour qu'on ne sache pas par où commencer, ni trop petit pour qu'on perde le fil de l'objectif global.

-   **Gagner en visibilité** sur l'avancement du projet, à tous les niveaux
-   **Suivre l'exécution** au quotidien sans attendre la fin d'un sujet pour savoir où on en est
-   **Mieux planifier** en estimant la charge au bon niveau de granularité
-   **Identifier les blocages** rapidement et les traiter avant qu'ils ne freinent le sprint
-   **Livrer de façon indépendante**, sujet par sujet, sans dépendre de la complétion d'un gros bloc

Epic Grande fonctionnalité · durée max 1 quarter

└ User Story Besoin fonctionnel · liée à une Epic

└ Tâche technique Action technique · liée à une US

1

Epic

Nouvelle fonctionnalité ou besoin d'amélioration à développer

-   Décomposée en User Stories pour couvrir le besoin fonctionnel
-   Sa durée de vie ne doit pas excéder un quarter
-   La charge d'effort est calculée automatiquement (somme des US et tâches liées)

Format du ticket

Description Responsable (PO ou Lead Tech) Charge d'effort Label : `Quarter` Titre : Nom feature + Quarter

2

User Story technico-fonctionnelle

Besoin fonctionnel issu d'une Epic

-   Obligatoirement rattachée à une Epic via l'**Epic Link**
-   Rédigée par un Leader technique ou l'équipe de développement
-   Doit être SMART et réalisable en quelques jours
-   Doit pouvoir être déployée indépendamment en production
-   Si sa charge est trop importante → décomposée en tâches techniques
-   Si une analyse est nécessaire → une tâche dédiée est créée et liée à la US

Format selon le cas

Champ

US classique

US décomposée en tâches

Description fonctionnelle _(As… I want… to)_

✓

✓

Description technique

✓

✕

Responsable _(PO ou Lead Tech)_

✓

✓

Story points

✓

✕ reporté sur les tâches

Critères d'acceptation

✓

⚠ Optionnel

3

Tâche technique

Action à réaliser pour développer une User Story

-   Obligatoirement liée à une US via le lien `treats`
-   Permet de mieux comprendre ce qui doit être fait et de suivre l'avancement sur une US
-   Contient une partie des critères d'acceptation de la US parente
-   Permet une mise en production indépendante si l'US ne peut pas être complétée en un seul sprint

Format du ticket

Description technique Story points Label : `Project` / `Programming` / `Spike` Critères d'acceptation
