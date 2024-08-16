export class Tag{
    static readonly ANGULAR = new Tag('Angular','red',false);
    static readonly ASPNET = new Tag('ASP.Net','burlywood',false);
    static readonly PYTHON = new Tag('Python','blue',true);
    static readonly REACT = new Tag('React','blue',false);
    static readonly TYPESCRIPT = new Tag('Typescript','blue',true);
    static readonly JAVASCRIPT = new Tag('Javascript','blue',true);
    static readonly CSHARP = new Tag('C#','blue',true);
    static readonly JAVA = new Tag('Java','blue',true);

    private constructor(public readonly key: string, public readonly color: string, public readonly isLanguage: boolean){

    }

    toString() {
        return this.key;
    }
}