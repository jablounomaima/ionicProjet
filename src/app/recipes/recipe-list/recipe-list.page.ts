// src/app/recipes/recipe-list/recipe-list.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../services/recipe.model';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonChip } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  imports: [CommonModule,IonHeader,FormsModule, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonChip]
  
})
export class RecipeListPage implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private subscription!: Subscription;

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipes$.subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  goToDetail(recipeId: number) {
    this.router.navigate(['/recipe-detail', recipeId]);
  }

  goToAddRecipe() {
    this.router.navigate(['/add-recipe']);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}