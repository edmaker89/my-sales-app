import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { Router } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { Observable, lastValueFrom, of } from 'rxjs';
import { Suppliers } from '../suppliers.dto';

@Component({
  selector: 'app-suppliers-new',
  standalone: true,
  imports: [
    MaterialModule,
    SuppliersFormComponent,
    AsyncPipe,
    LoadingBarComponent
  ],
  templateUrl: './suppliers-new.component.html',
  styles: ``
})
export class SuppliersNewComponent implements OnInit {
  router = inject(Router)
  supplierService = inject(SupplierService)
  supplierObservable!: Observable<Suppliers>
  supplier: Suppliers
  
  async ngOnInit() {
    this.supplierObservable = await of(this.supplierService.create()) //sem ela não espera os dados para carregar o formulario
    this.supplier = await lastValueFrom(this.supplierObservable)
    console.log(this.supplier)
  }

  async onSave(supplier: Suppliers) {
    this.supplierObservable = this.supplierService.save(supplier)
    const result = await lastValueFrom(this.supplierObservable)
    this.router.navigate(['/suppliers/show', result.id])
  }

  onBack() {
    this.router.navigate(['/suppliers/'])
  }
}
