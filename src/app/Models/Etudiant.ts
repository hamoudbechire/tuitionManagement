import { Classe } from "./Classe";

export class Etudiant{
    public etudiantId : number;
    public firstName : string;
    public lastName : string;
    public phone : string 
    public classeId? : number;
    public classe : Classe
}