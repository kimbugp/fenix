import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/models';
import { UserService, AuthenticationService } from '@/services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router,

    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    viewUser(id: number) {
        this.router.navigate([`/scripts`])
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}