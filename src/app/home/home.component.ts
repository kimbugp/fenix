import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Scripts } from '@/models';
import { UserService, AuthenticationService } from '@/services';
import { Router } from '@angular/router';
import { Columns, API, Config, DefaultConfig, APIDefinition } from 'ngx-easy-table';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { ScriptsService } from '@/services/scripts.service';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
    @ViewChild('isAdminTpl', { static: true }) isAdminTpl: TemplateRef<any>;
    @ViewChild('nameTpl', { static: true }) nameTpl: TemplateRef<any>;
    @ViewChild('emailTpl', { static: true }) emailTpl: TemplateRef<any>;
    @ViewChild('passwordTpl', { static: true }) passwordTpl: TemplateRef<any>;

    @ViewChild('isAdmin', { static: false }) isAdmin: ElementRef<any>;
    @ViewChild('password', { static: false }) password: ElementRef<any>;
    @ViewChild('name', { static: false }) name: ElementRef<any>;
    @ViewChild('email', { static: false }) email: ElementRef<any>;
    currentUser: User;
    editRow: number;
    checked = new Set(['_id', 'name', 'isAdmin', 'scripts', 'actions']);
    public configuration: Config;
    public users = [];
    public columns: Columns[]
    columnsCopy: Columns[] = [];
    scripts: Scripts[];
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router,
        private ngxService: NgxUiLoaderService,
        private scriptService: ScriptsService

    ) {
        this.callLoader();

        this.currentUser = this.authenticationService.currentUserValue;
        this.ngxService.stopBackground('do-background-things');
    }

    private callLoader() {
        this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
        // Stop the foreground loading after 5s
        setTimeout(() => {
            this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
        }, 5000);
    }

    ngOnInit() {
        this.configuration = { ...DefaultConfig };
        // this.configuration.searchEnabled = true;
        this.configuration.resizeColumn = true;
        this.configuration.horizontalScroll = true;

        this.columnsCopy = [
            { key: '_id', title: '#' },
            { key: 'name', title: 'Name', cellTemplate: this.nameTpl },
            { key: 'email', title: 'Email', cellTemplate: this.emailTpl },
            { key: 'isAdmin', title: 'Admin', cellTemplate: this.isAdminTpl },
            { key: 'scripts', title: 'Scripts' },
            { key: 'password', title: 'Password', cellTemplate: this.passwordTpl, width: '60px' },
            { key: 'action', title: 'Actions', cellTemplate: this.actionTpl },
        ]
        this.columns = this.columnsCopy
        this.loadAllUsers();


        // load scripts
        this.loadScripts()

    }
    private loadScripts() {
        this.scriptService.adminGetAll()
            .pipe(first())
            .subscribe(response => this.scripts = response.scripts);
    }
    viewScript(id: string) {
        this.router.navigate([`/scripts/${id}`])
    }

    addRow(): void {
        const obj = {
            isAdmin: false,
            name: 'Enter Name Here',
            email: `${Math.random().toString(36).substring(7)}@${Math.random().toString(36).substring(7)}.domain`,
            password: "secret"
        }
        this.userService.register(obj)
            .pipe(first()).subscribe(res => {
                let userCopy = this.users
                userCopy.shift()
                this.users = [
                    res.user,
                    ...userCopy
                ]
            })
        this.users = [
            obj,
            ...this.users
        ]
    }
    edit(rowIndex: number): void {
        this.editRow = rowIndex;
    }

    update(id: string): void {
        this.callLoader()
        const obj = {
            isAdmin: this.isAdmin.nativeElement.value,
            name: this.name.nativeElement.value,
            email: this.email.nativeElement.value,
            password: this.password.nativeElement.value
        }
        this.userService.update(id, obj)
            .pipe(first()).subscribe(() => this.loadAllUsers())
        this.editRow = -1;
    }
    remove(rowIndex: string): void {
        this.callLoader()
        this.userService.delete(rowIndex)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    viewUser(id: string) {
        this.router.navigate([`/scripts`])
    }
    toggle(name: string): void {
        this.checked.has(name) ? this.checked.delete(name) : this.checked.add(name);
        this.columns = this.columnsCopy.filter((column) => this.checked.has(column.key));
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(res => {
                return this.users = res.users
            });
    }
}