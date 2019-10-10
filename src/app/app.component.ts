import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObservableEvent } from '@typebytes/ngx-template-streams';

import { ResourcesService } from './resources.service';
import { mapToColumn } from './operators';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('resourcesAnimation', [
      transition('* => *', [
        query(':enter' , [
          style({ opacity: 0, transform: 'scale(.7)' }),
          stagger(0, [
            animate('0.3s', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  @ObservableEvent()
  input$: Observable<KeyboardEvent>;
  resources$ = this.resourcesService.resources$;
  query$ = this.resourcesService.query$;
  columns$ = merge(
    this.breakpointObserver.observe(Breakpoints.XSmall).pipe(mapToColumn(1)),
    this.breakpointObserver.observe(Breakpoints.Small).pipe(mapToColumn(1)),
    this.breakpointObserver.observe(Breakpoints.Medium).pipe(mapToColumn(2)),
    this.breakpointObserver.observe(Breakpoints.Large).pipe(mapToColumn(3)),
    this.breakpointObserver.observe(Breakpoints.XLarge).pipe(mapToColumn(3)),
  );

  category = {
    'talk': '🎤',
    'article': '📝',
    'library': '🔧',
    'recording': '📺',
    'book': '📖'
  };

  constructor(
    private resourcesService: ResourcesService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.input$.pipe(
      map(evt => (evt.target as HTMLInputElement).value)
    ).subscribe(query => this.resourcesService.search(query));
  }

  randomizeResources() {
    this.resourcesService.randomizeResources();
  }
}
