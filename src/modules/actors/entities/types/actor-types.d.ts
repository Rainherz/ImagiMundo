type ActorTaxonomy = {
    id: string,
    value:string
}

type ActorType = {
    id: string,
    name: string,
    type: ActorTaxonomy,
    parents: ActorAuxiliarType[],
}

type ActorAuxiliarType = ActoryType | string