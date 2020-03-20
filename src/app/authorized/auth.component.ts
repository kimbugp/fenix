import { Component } from '@angular/core';
import { AuthenticationService } from '@/services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'auth.component.html' })
export class NotAuthorized  {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }
}