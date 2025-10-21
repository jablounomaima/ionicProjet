// src/app/recipes/recipe-detail/recipe-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html'
})
export class RecipeDetailPage implements OnInit {
  recipe: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.recipe = this.recipeService.getRecipeById(id);
    if (!this.recipe) this.router.navigate(['/recipe-list']);
  }

  async deleteRecipe() {
    const alert = await this.alertController.create({
      header: 'Supprimer ?',
      message: 'Voulez-vous vraiment supprimer cette recette ?',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Supprimer',
          handler: () => {
            if (this.recipe?.id) {
              this.recipeService.deleteRecipe(this.recipe.id);
            }
            this.router.navigate(['/recipe-list']);
          }
        }
      ]
    });
    await alert.present();
  }
}