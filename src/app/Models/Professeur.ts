import { Matiere } from "./Matiere";

export class Professeur{
    idProf : number;
    firstName : string;
    lastName : string;
    mail : string;
    phone : string;
    matiereId? : number;
    matiere : Matiere
}