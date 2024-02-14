export class Contact{
    private fullName;
    public name;
    public lastName;
    public cellphone;

    constructor(name:string, lastName:string, cellphone:string){
        this.name = name;
        this.lastName= lastName,
        this.cellphone = cellphone;
        this.fullName = this.name + " " + this.lastName;

    }
    getFullName(){
        return this.fullName;
    }
}