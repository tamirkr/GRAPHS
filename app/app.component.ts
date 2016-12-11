import {
    Component,
    Input,
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'pm-app',
    templateUrl: 'app.component.html',
    animations: [
        trigger('slideInOut', [
            state('in', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('out', style({
                transform: 'translate3d(-80%, 0, 0)'
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ]),
    ]
})
export class AppComponent {
    menuState: string = "in"

    toggle(): void {
        this.menuState = this.menuState === 'in' ? 'out': 'in';
    }
}
