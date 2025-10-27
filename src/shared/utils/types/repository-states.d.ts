interface RepositoryData<ELEMENT> {
    count: number,
    results: ELEMENT[]
    from?: number
    to?: number
}

interface RepositoryState<ELEMENT, FILTERS = {}> {
    filters: FILTERS
    data?: RepositoryData<ELEMENT>
}