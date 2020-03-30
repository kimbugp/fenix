import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Scripts } from '@/models';
import { ScriptsService } from '@/services/scripts.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, AuthenticationService } from '@/services';


@Component({ templateUrl: 'create.component.html' })
export class CreateScriptsComponent implements OnInit {
    currentUser: User;
    scriptForm: FormGroup;
    loading = false;
    submitted = false;


    constructor(
        private authenticationService: AuthenticationService,
        private scriptService: ScriptsService,
        private router: Router,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.scriptForm = this.formBuilder.group({
            name: ['', Validators.required]
        });

    }

    get f() { return this.scriptForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.scriptForm.invalid) {
            return;
        }
        this.loading = true;
        let obj = { name: this.scriptForm.value.name, content: [''], author: this.currentUser._id }
        this.scriptService.create(obj)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Script Created', true);
                    this.router.navigate([`/scripts/${data.script._id}`]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}