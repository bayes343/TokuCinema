import { MediaFilterPakage } from './../../domain/MediaFilterPackage';
import { Component, OnInit } from '@angular/core';
import { Media } from '../../domain/Media';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DomainBuilder, DataType } from './../../domain/Builder';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {
  mediaItems = new Array<Media>();
  searchTerm: string = '';
  mediumFilter: string = '';
  spokenLanguageFilter: string = '';
  subtitleLanguageFilter: string = '';
  countryFilter: string = '';
  regionFilter: any = '';
  mediaData: FirebaseListObservable<any[]>;
  showFilters: string = "Show filters +";

  // Form use
  mediums = new Array<string>();
  spokenLanguages = new Array<string>();
  subtitleLanguages = new Array<string>();
  countries = new Array<string>();
  regions = new Array<string>();

  constructor(db: AngularFireDatabase) { 
    this.mediaData = db.list('/media');
  }

  ngOnInit() {
    this.mediaData.forEach(element => {
      for (var i = 0; i < element.length; i++) {
        let domainBuilder = new DomainBuilder(element[i], DataType.Media);
        let domainObject = domainBuilder.getDomainObject();
        this.mediaItems.push(domainObject);
        this.populateFiltersWithTheseOptions(domainObject);
        console.log(domainObject);
      }
    });
  }

  public toggleShowFilters(): void {
    if(this.showFilters === 'Show filters +') {
      this.showFilters = 'Hide filters -';
    } else {
      this.showFilters = 'Show filters +';
    }
  }

  public clearFilters(): void {
    this.countryFilter = '';
    this.mediumFilter = '';
    this.regionFilter = '';
    this.spokenLanguageFilter = '';
    this.subtitleLanguageFilter = '';
  }

  // Gurantees filters are only populated with viable options
  private populateFiltersWithTheseOptions(media: Media): void {
    if (!(this.countries.indexOf(media.Country) >= 0)) {
      this.countries.push(media.Country);
    }
    if (!(this.mediums.indexOf(media.Medium) >= 0)) {
      this.mediums.push(media.Medium);
    }
    if (!(this.regions.indexOf(media.Region) >= 0)) {
      this.regions.push(media.Region);
    }
    media.AudioTracks.forEach(element => {
      if (!(this.spokenLanguages.indexOf(element) >= 0)) {
        this.spokenLanguages.push(element);
      }
    });
    media.Subtitles.forEach(element => {
      if (!(this.subtitleLanguages.indexOf(element) >= 0)) {
        this.subtitleLanguages.push(element);
      }
    });
  }

}
