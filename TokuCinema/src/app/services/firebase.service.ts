import { DomainBuilder, DataType } from '../domain/Builder';
import { StringCleaner, StringType } from '../domain/StringCleaner';

import { Injectable } from '@angular/core';
import { AngularFireStorage} from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageTypes } from 'app/domain/Types';

@Injectable()
export class FirebaseService {
    public cachedData: Array<{
          branchName: string,
          data: Observable<any>
        }> = new Array<{
          branchName: string,
          data: Observable<any>
        }>();

    constructor(
      private db: AngularFireDatabase,
      private fireStorage: AngularFireStorage
    ) {}

    public getBranch(branchName: string): Observable<any> {
      const cachedBranch = this.cachedData.find( item => item.branchName === branchName);
      if (!cachedBranch) {

        let itemRef: AngularFireList<any>;
        let item: Observable<any[]>;

        itemRef = this.db.list('/' + branchName);
        item = itemRef.valueChanges();

        // cache for future use
        const branchToCache = {branchName: branchName, data: item};
        this.cachedData.push(branchToCache);
        return item;
      } else {
        return cachedBranch.data;
      }
    }

    public getItemFromBranch(item: string, branchName: string, itemIsRoute: boolean, buildType: DataType): Observable<any> {
      const itemString = itemIsRoute ? this.getPathFromRoute(item) : item;
      const branchItem = this.db.list('/' + branchName, ref => ref.orderByChild('Path').equalTo(itemString)).valueChanges().pipe(
        map(response => {
          return this.extractDomainObject(response, buildType);
      }));

      return branchItem;
    }

    public getImageUrl(branchName: string, path: string, imageType: ImageTypes, subDirectory?: string): Observable<any> {
      let filename: string;
      if (imageType === 'THUMB_CARD') {
        filename = 'thumb-card.png';
      } else if (imageType === 'THUMB_DETAILS') {
        filename = 'thumb-details.png'
      }
      let storageDirectory;
      if (subDirectory) {
        storageDirectory = 'images/' + branchName + '/'  + path + '/' + subDirectory;
      } else {
        storageDirectory = 'images/' + branchName + '/'  + path;
      }
      const storage = this.fireStorage.ref(storageDirectory);
      return storage.child(filename).getDownloadURL();
    }

    public getImageMetadata(path: string, branchName: string): Observable<any> {
      return this.fireStorage.ref('images/' + branchName + '/' + path).child('thumb-details.png').getMetadata();
    }

    private extractDomainObject(res: any, buildType: DataType): Observable<any> {
      let domainObject: any;
      res.forEach(element => {
        if (element) {
          const domainBuilder = new DomainBuilder(element, buildType);
          domainObject = domainBuilder.getDomainObject();
        }
      });

      return domainObject;
    }

    private getPathFromRoute(route: string): string {
      let path = '';

      path = new StringCleaner(route, StringType.WithRoute).getCleanString();

      return path;
    }

}
