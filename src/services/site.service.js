import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
import { store } from '../store/index'
import { getActionAddSite, getActionRemoveSite, getActionUpdateSite } from "../store/actions/site.actions.js";



const STORAGE_KEY = 'sites'
const siteChannel = new BroadcastChannel('siteChannel')

  ; (() => {
    siteChannel.addEventListener('message', (ev) => {
      store.dispatch(ev.data)
    })
  })()


export const siteService = {
  query,
  getById,
  save,
  remove,
  getSitesByAssignedIds,
  getEmptySite
}

window.cs = siteService

async function insertDemoData() {
  try {
    const jsonData = require('./db/sites.json');
    const demoData = jsonData.sites;
    storageService.postMany(STORAGE_KEY, demoData);
  } catch (error) {
    console.error('Failed to insert demo data:', error);
  }
}


async function query(filterBy) {
  var fetchedSites = await storageService.query(STORAGE_KEY);
  if (!fetchedSites || !fetchedSites.length) {
    insertDemoData()
  }
  if (filterBy) {
    const { id } = filterBy
    if (id) {
      fetchedSites = fetchedSites.filter((site) => site.id === id);
    }
    return fetchedSites;
  }
}

async function getSitesByAssignedIds(assignedIds) {
  const fetchedSites = await storageService.query(STORAGE_KEY);
  const filteredSites = fetchedSites.filter((site) =>
    assignedIds.includes(site.id)
  );
  return filteredSites;
}

async function save(site) {
  var savedSite
  if (site.id) {
    savedSite = await storageService.put(STORAGE_KEY, site)
    siteChannel.postMessage(getActionUpdateSite(savedSite))
  } else {
    site.id = utilService.makeId()
    savedSite = await storageService.post(STORAGE_KEY, site)
    siteChannel.postMessage(getActionAddSite(savedSite))
  }
  return savedSite
}

function getById(siteId) {
  return storageService.get(STORAGE_KEY, siteId)
}

async function remove(siteId) {
  await storageService.remove(STORAGE_KEY, siteId)
  siteChannel.postMessage(getActionRemoveSite())
}

function getEmptySite() {
  return {
    "site_name": "",
    "location": ""
  }
}
