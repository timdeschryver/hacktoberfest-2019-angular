import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, pluck, filter, withLatestFrom, take, skip, debounceTime } from 'rxjs/operators';

import { resources } from '../assets/resources.json';

@Injectable({
 providedIn: 'root'
})
export class ResourcesService {
  private resources: {
    title: string,
    description: string,
    author: {
      name: string
      profile?: string
    },
    url: string,
    category: string,
    contributor: {
      name: string,
      profile?: string
    }
  }[] = [...resources];

  private routeQuery = this.route.queryParams.pipe(pluck('query'));
  private placeholder = { title: 'placeholder', description: '', author: { name: '' }, contributor: { name: '' }, category: '', url: '' };

  // https://stackoverflow.com/a/12646864
  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  querySubject$ = new BehaviorSubject<string>('');
  query$ = this.querySubject$.pipe(skip(1));
  resources$ = this.routeQuery.pipe(
    map(query => {
      if (!query) {
        return this.resources.concat(this.placeholder as any);
      }

      const queryLower = query.toLowerCase();
      return this.resources.filter(resource =>
        resource.title.toLowerCase().includes(queryLower) ||
        resource.description.toLowerCase().includes(queryLower) ||
        resource.author.name.toLowerCase().includes(queryLower) ||
        resource.contributor.name.toLowerCase().includes(queryLower) ||
        resource.category.toLowerCase().includes(queryLower) ||
        resource.url.toLowerCase().includes(queryLower)
      ).concat(this.placeholder as any);
    })
  );

  constructor(private router: Router, private route: ActivatedRoute) {
    this.shuffleArray(this.resources);

    this.router.events
      .pipe(
        filter(evt => evt instanceof NavigationEnd),
        withLatestFrom(this.routeQuery, (_, query) => query),
        take(1)
      )
      .subscribe(query => this.search(query || ''));

    this.query$
      .subscribe(query => {
        this.router.navigate([], query ? {
          queryParams: {
            query
          },
        } : {});
      });
  }

  search(query: string) {
    this.querySubject$.next(query);
  }
}
