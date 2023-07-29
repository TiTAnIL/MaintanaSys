import { storageService } from "./async-storage.service.js";
import { store } from '../store/index';
import { updateHistory } from "../store/actions/history.actions.js";
import { utilService } from "./util.service.js";

const STORAGE_KEY = 'histories';
const historyChannel = new BroadcastChannel('historyChannel');

; (() => {
    historyChannel.addEventListener('message', (ev) => {
        store.dispatch(ev.data);
    });
})();


export const historiesService = {
    query,
    getById,
    save,
    remove
}

// async function insertDemoData() {
//   try {
//     console.log('inserting demo data');
//     const jsonData = require('./db/histories.json');
//     const demoData = jsonData.histories;
//     storageService.postMany(STORAGE_KEY, demoData);
//   } catch (error) {
//     console.error('Failed to insert demo data:', error);
//   }
// }

window.cs = historiesService;

async function query(filterBy) {
    var fetchedHistories = await storageService.query(STORAGE_KEY);
    if (!fetchedHistories || !fetchedHistories.length) {
        // insertDemoData();
        console.log('no demo data for histories')
    }
    return fetchedHistories;
}

async function save(history) {
    var savedHistory
    if (history.id) {
        savedHistory = await storageService.put(STORAGE_KEY, history)
        historyChannel.postMessage(updateHistory(savedHistory))
    } else {
        history.id = utilService.makeId()
        savedHistory = await storageService.post(STORAGE_KEY, history)
        //   historyChannel.postMessage(addHistory(savedHistory))
    }
    return savedHistory
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id);
}

async function remove(id) {
    await storageService.remove(STORAGE_KEY, id);
    //   historyChannel.postMessage(removeHistory());
}
