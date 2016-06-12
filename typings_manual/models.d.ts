interface CEvent {
    id:number
    name:string,
    aliases:string[],
    venue_id:number,
    start_time:number,
    end_time:number,
    start_date:number,
    end_date:number
}

interface CVenue {
    id:number
    name:string,
    aliases:string[],
    event_ids:number[],
    address:string
}

interface CQuery {
    type:string,
    starters:string[],
    keywords:string[],
    objects_applicable:string,
}