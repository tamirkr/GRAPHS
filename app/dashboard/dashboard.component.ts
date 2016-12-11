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
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    animations: [
        trigger('divState', [
            state('inactive', style({
                // backgroundColor: '#eee',
                transform: 'scale(0.9)'
            })),
            state('active', style({
                // backgroundColor: '#cfd8dc',
                transform: 'scale(1)'
            })),
            transition('inactive => active, active => inactive',
                animate('100ms ease-out'))
        ]),
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate(1000)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})

export class DashboardComponent {
    title: string = " Hello World";
}