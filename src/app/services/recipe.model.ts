// src/app/services/recipe.model.ts
export interface Recipe {
    id: number;
    title: string;                // Titre de la recette
    image: string;                // Chemin de l'image principale
    prepTime: number;             // Temps de préparation (en minutes)
    difficulty: 'facile' | 'moyen' | 'difficile';
    categories: string[];         // Ex: ['végétarien', 'rapide']
    ingredients: string[];        // Liste des ingrédients
    steps: string[];              // Étapes de préparation
  }