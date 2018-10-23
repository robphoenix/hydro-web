import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-showme',
  templateUrl: './showme.component.html',
  styleUrls: ['./showme.component.scss'],
})
export class ShowmeComponent implements OnInit {
  showme: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getShowMe().subscribe(
      (res: string) => {
        this.showme = res;
      },
      (err) => {
        console.error({ err });
      },
    );
  }

  getShowMe(): Observable<string> {
    return this.http
      .get('http://mn2splmfe001sd0:8080/p/showme', {
        responseType: 'text' as 'text',
      })
      .pipe(tap((res: string) => res));
  }
}
