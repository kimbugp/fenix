import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, Scripts } from '@/models';
import { UserService, AuthenticationService } from '@/services';
import { ScriptsService } from '@/services/scripts.service';
import { ActivatedRoute } from '@angular/router';

@Component({ templateUrl: 'script.component.html' })
export class ScriptComponent implements OnInit, OnChanges {
    currentUser: User;
    id = 1
    users = []
    owner = Scripts;
    @Input() theme = 'vs-dark';
    @Input() readOnly = false;
    @Input() script = {
        name: 'Sample script',
        content: ["DoTheOtherThing(float)",]
    }
    @Input()
    model = {
        value: this.script.content.join('\n'),
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
    ngOnChanges(changes: SimpleChanges) {
        console.log(changes.file)

    }
    private getScript(id: number) {
        this.scriptsService.get(id)
            .pipe(first())
            .subscribe(script => this.script = script);
    }
    saveScript(value) {
        console.log(value)
    }

    runScript() {
        console.log(this.model.value)

    }
}

