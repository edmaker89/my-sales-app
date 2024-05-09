import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suppliers } from './suppliers.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(environment.api + 'suppliers')
  }

  public getByid(id: Number): Observable<Suppliers> {
    return this.http.get<Suppliers>(environment.api + 'suppliers/' + id)
  }

  public save(suppliers: Suppliers): Observable<Suppliers> {
    if (suppliers.id)
      return this.http.put<Suppliers>(
    environment.api + 'suppliers/' + suppliers.id, suppliers)
    return this.http.post<Suppliers>(environment.api + 'suppliers', suppliers)
  }

  public delete(id: Number): Observable<Suppliers> {
    return this.http.delete<Suppliers>(environment.api + 'suppliers/' + id)
  }

  public create(): Suppliers {
    return {
      id: 0,
      companyName: '',
      contactName: '',
      contactTitle: '',
      address: {
        city: '',
        street: '',
        region: '',
        postalCode: 0,
        country: '',
        phone: ''
      }
    }
  }
}
