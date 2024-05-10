import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAll(search: string = ''): Observable<Product[]> {
    const searchTerm = search != '' ? '&q=' + search : ''
    return this.http.get<Product[]>(
      environment.api + 'products?_expand=category&_expend=supplier' + searchTerm
    )
  }
}
