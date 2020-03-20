import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, Scripts } from '@/models';
import { UserService, AuthenticationService } from '@/services';
import { ScriptsService } from '@/services/scripts.service';
import { ActivatedRoute } from '@angular/router';

@Component({ templateUrl: 'script.component.html' })
export class ScriptComponent implements OnInit {
    currentUser: User;
    id = 1
    users = []
    owner = Scripts;
    @Input() activeTheme = 'vs';
    @Input() readOnly = false;
    @Input()
    script = [
        "DoTheOtherThing(float)",
    ].join('\n');
    model = {
        value: this.script,
        language: 'fenixlang',
    };
    constructor(
        private authenticationService: AuthenticationService,
        private scriptsService: ScriptsService,
        private route: ActivatedRoute
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.id = this.route.snapshot.params.id;
    }
    ngOnInit() {
        this.getScript(this.id)
        console.log(this.id)
    }
    private getScript(id: number) {
        this.scriptsService.get(id)
            .pipe(first())
            .subscribe(script => this.script = script.content.join('\n'));
    }
}

