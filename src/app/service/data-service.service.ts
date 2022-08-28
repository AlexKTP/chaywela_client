import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<any>(null);

  public dataObservable = this.dataSubject.asObservable();

  public setData(data: any) {
    this.dataSubject.next(data);
  }

}
