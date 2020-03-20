import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Scripts } from '@/models';
import { AuthenticationService } from '@/services';
import { ScriptsService } from '@/services/scripts.service';
import { Router } from '@angular/router';

@Component({ templateUrl: 'scripts.component.html' })
export class ScriptsComponent implements OnInit {
    currentUser: User;
    scripts: Scripts[] = [{ owner: 1, id: 2, content: ['DoThat()', "DOthis()"], name: 'Sample' }];

    constructor(
        private authenticationService: AuthenticationService,
        private scriptService: ScriptsService,
        private router: Router,

    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        // this.loadScripts();
    }

    deleteScript(id: number) {
        this.scriptService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadScripts());
    }
    viewScript(id: number) {
        this.router.navigate([`/scripts/${id}`])
    }

    private loadScripts() {
        this.scriptService.getAll()
            .pipe(first())
            .subscribe(scripts => this.scripts = scripts);
    }
}