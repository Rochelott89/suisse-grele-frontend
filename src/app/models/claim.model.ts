export class Claim {

    //todos string salvo listas, que son string[]
    //constructor, si un elemento es opcional por ejemplo id?, no se inicializa en conctructor

    id : string;
    title : string;
    description : string;   
    created_at : string;
    updated_at : string;
    status : string;
    damage_type : string;
    client_id : string;
    contract_id : string;

    constructor() {
        this.id = '';
        this.title = '';
        this.description = '';
        this.created_at = '';
        this.updated_at = '';
        this.status = '';
        this.damage_type = '';
        this.client_id = '';
        this.contract_id = '';
    }

}
