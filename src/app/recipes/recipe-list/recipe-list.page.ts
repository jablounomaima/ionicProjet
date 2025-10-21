// src/app/recipes/recipe-list/recipe-list.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../services/recipe.model';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonChip, IonCard } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  imports: [CommonModule, IonHeader, FormsModule, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonChip, IonCard]
  
})
export class RecipeListPage implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private subscription!: Subscription;

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {

    addIcons({
      'add': add
    });
  }


  

  ngOnInit() {
    this.subscription = this.recipeService.recipes$.subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  goToDetail(recipeId: number) {
    console.log('Navigating to recipe ID:', recipeId);
    this.router.navigate(['/recipe-detail', recipeId]);
  }

  goToAddRecipe() {
    this.router.navigate(['/add-recipe']);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }



}