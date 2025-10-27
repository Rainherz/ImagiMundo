type UpdateFilterRepositoryAction <FILTER> = {
   type: "filter",
   filters: FILTER
}

type UpdateResultsRepositoryAction <ELEMENT> = {
   type: "update",
   data: RepositoryData
}

type RepositoryAction <ELEMENT, FILTER> = UpdateFilterRepositoryAction<FILTER> & UpdateResultsRepositoryAction