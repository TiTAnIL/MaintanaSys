import { siteService } from "../../services/site.service.js"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'


export function getActionRemoveSite(siteId) {
  return {
    type: 'REMOVE_SITE',
    siteId: siteId,
  }
}

export function getActionAddSite(site) {
  return {
    type: 'ADD_SITE',
    site,
  }
}

export function getActionUpdateSite(site) {
  return {
    type: 'UPDATE_SITE',
    site,
  }
}

export function loadSites(assignedIds) {
  console.log('load sites', assignedIds)
  return async (dispatch, getState) => {
    try {
      const sites = await siteService.getSitesByAssignedIds(assignedIds);
      dispatch({ type: 'SET_SITES', sites });
      dispatch({ type: 'SET_SITE_LOADING', isLoading: false });
    } catch (error) {
      console.log('Failed to load sites:', error);
    }
  };
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

export function removeSite(siteId) {
  return async (dispatch) => {
    try {
      await siteService.remove(siteId)
      console.log('Deleted Succesfully!')
      showSuccessMsg('Site removed')
      dispatch(getActionRemoveSite(siteId))
    } catch (err) {
      showErrorMsg('Cannot remove site')
      console.log('Cannot remove site', err)
    }
  }
}

export function addSite(site) {
  return async (dispatch) => {
    try {
      const savedSite = await siteService.save(site)
      console.log(savedSite)
      dispatch(getActionAddSite(savedSite))
      showSuccessMsg('site added')
    } catch (err) {
      showErrorMsg('Cannot add site')
      console.log('cannot add site', err)
    }
  }
}

export function updateSite(site) {
  return async (dispatch) => {
    try {
      const savedSite = await siteService.save(site)
      console.log('Updated site', savedSite)
      dispatch(getActionUpdateSite(savedSite))
      showSuccessMsg('Site updated')
    } catch (err) {
      showErrorMsg('Cannot update site')
      console.log('Cannot update site', err)
    }
  }
}

