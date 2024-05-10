import { Component, OnInit, inject } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Suppliers } from '../suppliers.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';

@Component({
  selector: 'app-suppliers-delete',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, RouterLink, LoadingBarComponent],
  templateUrl: './suppliers-delete.component.html',
  styles: ``
})
export class SuppliersDeleteComponent implements OnInit {
  
  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  supplier!: Suppliers
  supplierObservable!:Observable<Suppliers>

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.supplierObservable = this.supplierService.getByid(id)
    this.supplier = await lastValueFrom(this.supplierObservable)
  }

  async confirmDelete() {
    this.supplierObservable = this.supplierService.delete(this.supplier.id)
    await lastValueFrom(this.supplierObservable)
    this.router.navigate(['/suppliers'])
  }
}
