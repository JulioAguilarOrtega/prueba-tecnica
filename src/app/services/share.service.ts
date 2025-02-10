import { Injectable, signal } from '@angular/core';
import { DataSharing } from '../models/DataSharing.model';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private data = signal<DataSharing>({ amount: 10000000, currentRoute: '' });

  setData = (data: DataSharing) => {
    this.data.update(() => data);
  }

  getData = (): DataSharing => {
    return this.data();
  }
}
