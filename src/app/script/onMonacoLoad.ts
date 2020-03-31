import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';
export function onMonacoLoad() {
    // Register a new language
    monaco.languages.register({ id: 'fenixlang' });


    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider('fenixlang', {
        tokenizer: {
            root: [
                [/DoThisThing|DoThatThing|DoTheOtherThing/, 'custom-syntax'],
                [/\(([^)]+)\)/, 'argument']
            ]
        }
    });


    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme('theme', {
        base: 'vs-dark',
        inherit: false,
        colors: { '32': '008800' },
        rules: [
            { token: 'custom-syntax', foreground: '008800', fontStyle: 'bold' },
            { token: 'argument', foreground: '808080', fontStyle: 'bold' },
        ]
    });


    // Register a completion item provider for the new language
    monaco.languages.registerCompletionItemProvider('fenixlang', {
        provideCompletionItems: () => {
            var suggestions = [{
                label: 'DoTheOtherThing',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'DoTheOtherThing(${1:argument})',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1
                }
            },
            {
                label: 'DoThatThing',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'DoThatThing(${1:argument})',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1
                }
            },
            {
                label: 'DoThisThing',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'DoThisThing(${1:argument})',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1
                }
            }
            ];
            return { suggestions: suggestions };
        }
    });
}
export const monacoConfig: NgxMonacoEditorConfig = {
    defaultOptions: { scrollBeyondLastLine: false },
    onMonacoLoad
};
