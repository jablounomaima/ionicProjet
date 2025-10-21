import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recipe-list',
    loadComponent: () => import('./recipes/recipe-list/recipe-list.page').then( m => m.RecipeListPage)
  },
  {
    path: 'recipe-detail',
    loadComponent: () => import('./recipes/recipe-detail/recipe-detail.page').then( m => m.RecipeDetailPage)
  },
  {
    path: 'add-recipe',
    loadComponent: () => import('./recipes/add-recipe/add-recipe.page').then( m => m.AddRecipePage)
  },
];
