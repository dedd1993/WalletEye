import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpenseDetailListPage } from '../expense-detail-list/expense-detail-list';

import { ExpenseDetailService } from '../../app/services/expense-detail-service';
import { ExpenseCategoryService } from '../../app/services/expense-category-service';
import { ExpenseSubcategoryService } from '../../app/services/expense-subcategory-service';
import { ExpenseCategory as Category } from '../../app/models/expense-category';
import { ExpenseSubcategory as Subcategory } from '../../app/models/expense-subcategory';
import { ExpenseDetail as Detail } from '../../app/models/expense-detail';

import moment from 'moment';

/**
 * Generated class for the ExpenseDetailFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-detail-form',
  templateUrl: 'expense-detail-form.html',
})
export class ExpenseDetailFormPage {
  detail: Detail = new Detail();
  subcategories: Subcategory[];
  categories: Category[];
  categoryChoosedId: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private expenseCategoryService: ExpenseCategoryService,
              private expenseSubcategoryService: ExpenseSubcategoryService,
              private expenseDetailService: ExpenseDetailService) {

    this.categoryChoosedId = navParams.get('subcategory').gasto_categorias_id;
    this.detail.gasto_subcategorias_id = navParams.get('subcategory').id;
    this.detail.fecha = moment().format();

    this.expenseCategoryService.list().subscribe(data => {
      this.categories = data;
    });

    this.expenseSubcategoryService.listByCategory(this.categoryChoosedId).subscribe(data => {
      this.subcategories = data;
    });
  }

  ionViewDidLoad() {}

  create() {
    this.detail.fecha = moment().format(this.detail.fecha);

    this.expenseDetailService.create(this.detail).subscribe(data => {
      this.navCtrl.push(ExpenseDetailListPage, {'subcategory': this.navParams.get('subcategory')});
    });
  }

  cancel() {
    this.navCtrl.pop();
  }

}
