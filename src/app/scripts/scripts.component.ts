import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { User } from '@/models';
import { UserService, AuthenticationService } from '@/services';

@Component({ templateUrl: 'scripts.component.html' })
export class ScriptsComponent implements OnInit {
    currentUser: User;
    users =[]
    @Input() activeTheme = 'vs';
    @Input() readOnly = false;
    @Input()
    script = [
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
        "DoTheOtherThing(float)",
	].join('\n');
    model = {
        value: this.script,
        language: 'fenixlang',
      };
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }
    onCodeChanged(value: any) {
        console.log('CODE', value);
    }
    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}

