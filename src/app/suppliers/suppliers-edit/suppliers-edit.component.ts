import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { Suppliers } from '../suppliers.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';

@Component({
  selector: 'app-suppliers-edit',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingBarComponent, RouterLink, SuppliersFormComponent],
  templateUrl: './suppliers-edit.component.html',
  styles: ``
})
export class SuppliersEditComponent implements OnInit {
  router = new Router()
  route = inject(ActivatedRoute)
  supplierService = inject(SupplierService)
  supplier: Suppliers
  supplierObservable: Observable<Suppliers>

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.supplierObservable = this.supplierService.getByid(id)
    this.supplier = await lastValueFrom(this.supplierObservable)
  }

  async onSave(supplier: Suppliers) {
    this.supplierObservable = this.supplierService.save(supplier);
    this.supplier = await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers/show/', supplier?.id])
  }

  public onBack() {
    this.router.navigate(['/suppliers'])
  }
}
