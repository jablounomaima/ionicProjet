// src/app/recipes/add-recipe/add-recipe.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RecipeService } from '../../services/recipe.service';
import { IonButton, IonLabel, IonItem, IonInput, IonIcon, IonList, IonChip, IonSelectOption, IonSelect, IonBackButton, IonButtons, IonToolbar, IonTitle, IonHeader, IonContent } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  imports: [CommonModule,IonSelectOption, FormsModule, IonItem, IonLabel, IonSelect, IonInput, IonChip, IonButton, IonIcon, IonList, IonBackButton, IonButtons, IonToolbar, IonTitle, IonHeader, IonContent],
})
export class AddRecipePage {
  newRecipe = {
    title: '',
    image: 'assets/icons/default-recipe.svg',
    prepTime: 0,
    difficulty: 'facile' as const,
    categories: [] as string[],
    ingredients: [] as string[],
    steps: [] as string[]
  };

  categoryInput = '';
  ingredientInput = '';
  stepInput = '';

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {}

  addCategory() {
    if (this.categoryInput.trim()) {
      this.newRecipe.categories.push(this.categoryInput.trim());
      this.categoryInput = '';
    }
  }

  addIngredient() {
    if (this.ingredientInput.trim()) {
      this.newRecipe.ingredients.push(this.ingredientInput.trim());
      this.ingredientInput = '';
    }
  }

  addStep() {
    if (this.stepInput.trim()) {
      this.newRecipe.steps.push(this.stepInput.trim());
      this.stepInput = '';
    }
  }

  removeItem(arr: any[], index: number) {
    arr.splice(index, 1);
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });
      if (image.dataUrl) {
        this.newRecipe.image = image.dataUrl;
      }
    } catch (error) {
      console.log('Annulé', error);
    }
  }

  saveRecipe() {
    if (!this.newRecipe.title || this.newRecipe.prepTime <= 0) {
      alert('Titre et temps requis !');
      return;
    }
    this.recipeService.addRecipe(this.newRecipe);
    this.router.navigate(['/recipe-list']);
  }

  cancel() {
    this.router.navigate(['/recipe-list']);
  }
}