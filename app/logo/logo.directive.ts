import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({ selector: '[myHighlight]' })


export class HighlightDirective  {
    constructor(private el: ElementRef, private renderer: Renderer) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('green');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }



    private highlight(color: string) {
        this.renderer.setElementStyle(this.el.nativeElement, 'color', color)
    }
}