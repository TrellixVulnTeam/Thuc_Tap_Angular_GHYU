import { Component } from '@angular/core';
import { Product } from './data.products';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isVisible = false;
  isEditing = true;

  dataForm: FormGroup = new FormGroup({
    nameProduct: new FormControl(''),
    id: new FormControl(''),
  });
  searchForm: FormGroup = new FormGroup({
    nameFind: new FormControl(''),
  });

  selectedProduct?: Product;
  Products: Product[] = [
    { id: 1, nameProduct: 'Iphone X' },
    { id: 2, nameProduct: 'Samsung S9' },
    { id: 3, nameProduct: 'Iphone XI' },
    { id: 4, nameProduct: 'Iphone XII' },
    { id: 5, nameProduct: 'SamSung S7 Edge' },
    { id: 6, nameProduct: 'Vivo 2S' },
    { id: 7, nameProduct: 'Xiaomi 12' },
    { id: 8, nameProduct: 'Sony X12' },
  ];

  showModal(): void {
    this.isEditing = false;

    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  ngOnInit() {}

  onSubmit(): void {
    console.log(this.dataForm.value);

    if (this.dataForm.controls['id'].value === '') {
      let item = new Product();
      let idRandom = Math.ceil(Math.random() * 100);
      item.id = idRandom;
      item.nameProduct = this.dataForm.controls['nameProduct'].value;
      this.Products.push(item);
    } else {
      let item = new Product();
      this.Products.forEach((item) => {
        if (item.id === this.dataForm.controls['id'].value) {
          item.nameProduct = this.dataForm.controls['nameProduct'].value;
        }
      });
    }
    this.dataForm.controls.nameProduct.reset();
    this.isVisible = false;
  }
  onDeleteProduct(id: number) {
    this.Products = this.Products.filter((item) => item.id !== id);
  }
  onUpdateProduct(id: number) {
    this.isEditing = true;
    console.log('Update ID: ' + id);
    this.isVisible = true;
    var takeItem = this.Products.find((item) => item.id === id);
    this.dataForm.controls.nameProduct.setValue(takeItem?.nameProduct);
    this.dataForm.controls.id.setValue(takeItem?.id);
  }

  title() {
    return this.isEditing ? 'Update Item Product' : 'Add Item Product';
  }
  onSubmitSearch(): void {
    console.log(this.searchForm.controls['nameFind'].value);

    if (
      this.Products.filter(
        (item) =>
          item.nameProduct === this.searchForm.controls['nameFind'].value
      )
    ) {
      this.Products = this.Products.filter(
        (item) =>
          item.nameProduct === this.searchForm.controls['nameFind'].value
      );
    } else {

      alert('Not Search Product!');
    }
    this.searchForm.controls.nameFind.reset();

  }

  onRefresh():void{
    Products: this.Products= [
      { id: 1, nameProduct: 'Iphone X' },
      { id: 2, nameProduct: 'Samsung S9' },
      { id: 3, nameProduct: 'Iphone XI' },
      { id: 4, nameProduct: 'Iphone XII' },
      { id: 5, nameProduct: 'SamSung S7 Edge' },
      { id: 6, nameProduct: 'Vivo 2S' },
      { id: 7, nameProduct: 'Xiaomi 12' },
      { id: 8, nameProduct: 'Sony X12' },
    ];
  }

  onClearLeave(){
    this.searchForm.controls.nameFind.reset();
  }

}
