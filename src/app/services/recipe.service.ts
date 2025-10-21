// src/app/services/recipe.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 1,
      title: 'Pâtes à la carbonara',
      image: 'assets/icon/chef.png',
      prepTime: 20,
      difficulty: 'facile',
      categories: ['rapide', 'italien'],
      ingredients: ['200g de pâtes', '2 œufs', '100g de lardons', '50g de parmesan'],
      steps: ['Faire cuire les pâtes', 'Mélanger œufs et parmesan', 'Ajouter les lardons chauds']
    }
  ];
  private nextId = 2;

  private recipesSubject = new BehaviorSubject<Recipe[]>(this.recipes);
  public recipes$ = this.recipesSubject.asObservable();

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): void {
    this.recipes.push({ ...recipe, id: this.nextId++ });
    this.recipesSubject.next([...this.recipes]);
  }

  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.recipesSubject.next([...this.recipes]);
  }
}