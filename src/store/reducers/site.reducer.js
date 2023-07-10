
const INITIAL_STATE = {
    sites: [],
    filterBy: {},
    isLoading: true
}


export function siteReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_SITES':
            return {
                ...state,
                sites: action.sites
            }

        case 'ADD_SITE':
            return {
                ...state,
                sites: [...state.sites, action.site]
            }

        case 'REMOVE_SITE':
            return {
                ...state,
                sites: state.sites.filter(site => site.id !== action.siteId)
            }

        case 'UPDATE_SITE':
            return {
                ...state,
                sites: state.sites.map(site => site.id === action.site.id ? action.site : site)
            }
            
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
            
        case 'SET_SITE_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
            break
        default:
            return state;
    }
}