import { Component, OnInit } from '@angular/core';
import { MediaDetails } from '../../domain/MediaDetails';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {
  medias: Array<MediaDetails> = [
    new MediaDetails("DVD",
      "Godzilla",
      "ゴジラ (Gojira)",
      ["Aspect Ratio: 4x3", "Runtime: 90 minutes", "Black & White", "Runtime: 96 (Japanese) / 80 (American)",
          "Original Runtime: 96", "Chapter Stops: 12 (Japanese) / 5 (American)", "Subtitles: English"],
      ["Medium: DVD", "Format: Single Sided, Dual-Layer", "Region: 1", "Number of Discs: 2", "Color System: NTSC"],
      ["Distributor: Classic Media", "Catalog Code: 1234", "UPC: 0123456789", "Release Date: 2006"],
      []),
  new MediaDetails("DVD",
      "Godzilla",
      "ゴジラ (Gojira)",
      ["Aspect Ratio: 4x3", "Runtime: 90 minutes", "Black & White", "Runtime: 96 (Japanese) / 80 (American)",
          "Original Runtime: 96", "Chapter Stops: 12 (Japanese) / 5 (American)", "Subtitles: English"],
      ["Medium: DVD", "Format: Single Sided, Dual-Layer", "Region: 1", "Number of Discs: 2", "Color System: NTSC"],
      ["Distributor: Classic Media", "Catalog Code: 1234", "UPC: 0123456789", "Release Date: 2006"],
      []),
  new MediaDetails("DVD",
      "Godzilla",
      "ゴジラ (Gojira)",
      ["Aspect Ratio: 4x3", "Runtime: 90 minutes", "Black & White", "Runtime: 96 (Japanese) / 80 (American)",
          "Original Runtime: 96", "Chapter Stops: 12 (Japanese) / 5 (American)", "Subtitles: English"],
      ["Medium: DVD", "Format: Single Sided, Dual-Layer", "Region: 1", "Number of Discs: 2", "Color System: NTSC"],
      ["Distributor: Classic Media", "Catalog Code: 1234", "UPC: 0123456789", "Release Date: 2006"],
      [])
  ];
  searchTerm: string = '';

  constructor() { }

  ngOnInit() {
  }

}
