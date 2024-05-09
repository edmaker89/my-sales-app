import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { Suppliers } from '../suppliers.dto';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-suppliers-show',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingBarComponent, RouterLink],
  templateUrl: './suppliers-show.component.html',
  styles: ``
})
export class SuppliersShowComponent implements OnInit {
  
  route = inject(ActivatedRoute)
  supplierService = inject(SupplierService)
  supplier: Suppliers
  supplierObservable: Observable<Suppliers>
  
  async ngOnInit(): Promise<void> {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0 );
    this.supplierObservable = this.supplierService.getByid(id)
    this.supplier = await lastValueFrom(this.supplierObservable)
  }

}
