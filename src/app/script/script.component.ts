import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, Scripts } from '@/models';
import { ScriptsService } from '@/services/scripts.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '@/services';


@Component({ templateUrl: 'script.component.html' })
export class ScriptComponent implements OnInit, OnChanges {
    currentUser: User;
    _id: string;
    author = Scripts;
    loading = false;

    pageOfItems: Array<any>;
    @Input() theme = 'vs-dark';
    @Input() readOnly = false;
    script: Scripts = {
        name: '',
        content: [''],
        author: '',
        output: []
    }
    @Input()
    model = {
        value: this.script.content.join('\n'),
        language: 'fenixlang',
    };

    @Input()
    model2 = {
        value: this.script.output.join('\n'),
        language: 'fenixlang',
    };
    editor: any
    editor2: any
    constructor(
        private authenticationService: AuthenticationService,
        private scriptsService: ScriptsService,
        private route: ActivatedRoute,
        private alertService: AlertService

    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this._id = this.route.snapshot.params.id;
    }
    ngOnInit() {
        this.getScript(this._id)
    }
    private updateModel() {
        if (this.script.content) {
            this.model = {
                value: this.script.content.join('\n'),
                language: 'fenixlang',
            };
        }
    }

    updateOutput(index: number) {
        if (this.script.content) {
            this.model2 = {
                value: this.script.output[index].content.join('\n'),
                language: 'fenixlang',
            };
        }
    }

    private getScript(id: string) {
        this.scriptsService.get(id)
            .pipe(first())
            .subscribe(res => {
                this.script = res.script
                this.updateModel();

            });
    }
    getEditor(editor: any) {
        this.editor = editor;
    }
    ngOnChanges(changes: SimpleChanges) {
        console.log(changes)
    }

    getEditor2(editor: any) {
        this.editor2 = editor;
    }

    runScript() {
        // reset alerts on submit
        this.alertService.clear();
        this.loading = true;

        this.saveScript()

        this.scriptsService.runScript(this.script._id)
            .pipe(first())
            .subscribe(res => {
                this.loading = false
                this.script = res.script
                this.alertService.success('Script run complete')
            },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                })
    }
    saveScript() {
        // reset alerts on submit
        this.alertService.clear();
        this.loading = true

        let value = this.editor.getValue()
        value = value.split('\n')
        this.scriptsService.put(this.script._id, { content: value, name: this.script.name, author: this.currentUser._id })
            .pipe(first())
            .subscribe(res => {
                this.loading = false
                this.alertService.success('Script saved');
                this.script = res.script
            })
    }
}

