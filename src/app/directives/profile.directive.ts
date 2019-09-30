import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({ selector: '[appProfile]' })
export class ProfileDirective {
  @Input()
  set appProfile(profile: { name: string, profile: string }) {
    this.updateView(profile);
  }

  constructor(private templateRef: TemplateRef<any>, private container: ViewContainerRef) {}

  private updateView({ name, profile }: { name: string, profile: string }) {
    this.container.createEmbeddedView(this.templateRef);
    if (profile) {
      const anchor = document.createElement('a');
      anchor.href = profile;
      anchor.innerText = name;
      this.templateRef.elementRef.nativeElement.nextElementSibling.appendChild(anchor);
    } else {
      this.templateRef.elementRef.nativeElement.nextElementSibling.innerText += ' ' + name;
    }
  }
}
