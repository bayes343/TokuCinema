import { StringCleaner, StringType } from './StringCleaner';
import { Country, Language, Series, Era } from './Types';
import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';
import { Keyword } from './Keyword';

export class Movie implements ISearchable {
    public ReleaseYear: number;
    public ReleaseDate: Date = new Date();
    public CircaRelease: string;

    constructor(
        public OfficialTitle: string,
        public AlternateTitles: Array<{"TitleType": string, "TitleValue": string}>,
        public OriginalPoster: string,
        public ReleaseDateString: string,
        public ProductionCompany: string,
        public CountryOfOrigin: Country,
        public Languages: Array<Language>,
        public Distributor: string,
        public Director: string,
        public Series: Series,
        public Era: Era,
        public Runtime: number,
        public Crew: Array<{"PositionTitle": string, "Name": string}>,
        public Cast: Array<{"ActorName": string, "RoleName": string}>,
        public MediaPath: Array<string>,
        public AlternateVersionsPath: Array<string>,
        public Path?: string
    ) {
        // Assign default route if none given, clean either way
        if (this.Path) {
            this.Path = new StringCleaner(this.Path, StringType.WithoutRoute).getCleanString();
        } else {
            this.Path = new StringCleaner(this.OfficialTitle, StringType.WithoutRoute).getCleanString() + "-" + this.ReleaseYear;
        }
        this.setReleaseDate();

    }

    public setReleaseDate(): void {
        if(isNaN(Number(this.ReleaseDateString.substr(0,4)))) {
            this.ReleaseDate = null;
            this.CircaRelease = this.ReleaseDateString;
            this.ReleaseYear = Number(this.ReleaseDateString.substr(6,4));
        }
        else {
            this.ReleaseDate.setFullYear(Number(this.ReleaseDateString.substr(0,4)));
            this.ReleaseDate.setMonth(Number(this.ReleaseDateString.substr(5,2)));
            this.ReleaseDate.setDate(Number(this.ReleaseDateString.substr(8,2)));
            this.ReleaseDate.setHours(0,0,0,0); // Zero-out the time

            this.ReleaseYear = this.ReleaseDate.getFullYear();
        }

    }

    public getDisplayName(searchTerm: string): string {
        let displayName = this.OfficialTitle + " (" + this.ReleaseYear + ")";

        if (this.AlternateTitles && this.AlternateTitles.length) {
            let relaventAltTitle = this.AlternateTitles.find( item => item.TitleValue.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);

            if (relaventAltTitle) {
              displayName += "<p><em>" + relaventAltTitle.TitleValue + "</em></p>";
            } else {
              displayName += "<p><em>" + this.AlternateTitles[0].TitleValue + "</em></p>"
            }
        }

        if (displayName.length > 90) {
          displayName = displayName.slice(0, 90);
          displayName += '...';
        }

        return displayName;
    }

    public getType(): ItemType {
        return ItemType.Movie;
    }

    public getPath(): string {
        return this.Path;
    }

    public getKeywords(): Array<Keyword> {
        let keywords = new Array<Keyword>();

        // add title elements (if more than one word)
        let titleElements = this.OfficialTitle.split(' ');
        if (titleElements.length > 1) {
            titleElements.forEach(element => {
                keywords.push(new Keyword(element, false, true, false));
            });
        }

        // add exact matches
        keywords.push(new Keyword(this.OfficialTitle, true, false, false));
        // alternate titles are exact matches as well
        if (this.AlternateTitles && this.AlternateTitles.length) {
            this.AlternateTitles.forEach(element => {
                keywords.push(new Keyword(element.TitleValue, true, false, false));
            });

            this.AlternateTitles.forEach(element => {
                let alternateTitleWords = element.TitleValue.split(' ');
                if (alternateTitleWords.length > 1) {
                    alternateTitleWords.forEach(element => {
                        keywords.push(new Keyword(element, false, true, false));
                    });
                }
            });
        }

        // add attribute keywords
        keywords.push(new Keyword(this.CountryOfOrigin, false, false, true));

        let directorNames = this.Director.split(' ');
        directorNames.forEach(element => {
            keywords.push(new Keyword(element, false, false, true));
        });
        keywords.push(new Keyword(this.Distributor, false, false, true));
        keywords.push(new Keyword(this.ReleaseYear.toString(), false, false, true));

        return this.cleanKeywords(keywords);
    }

    getIconName(): string {
        return 'movies';
    }

    private cleanKeywords(keywords: Array<Keyword>): Array<Keyword> {
      let cleanKeywords = new Array<Keyword>();

      keywords.forEach(element => {
        if (element.word !== "") {
          cleanKeywords.push(element);
        }
      });

      return cleanKeywords;
    }

    public doesAtlernateTitlesExist(): boolean {
        if(typeof this.AlternateTitles !== "undefined") {
            if (this.AlternateTitles.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesCastExist(): boolean {
        if(typeof this.Cast !== "undefined") {
            if (this.Cast.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesCrewExist(): boolean {
        if(typeof this.Crew !== "undefined") {
            if (this.Crew.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesCastOrCrewExist(): boolean {
        if(this.doesCastExist || this.doesCrewExist()) {
            return true;
        }
        else {
            return false;
        }
    }
}
