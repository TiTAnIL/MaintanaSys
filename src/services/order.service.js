import { storageService } from "./async-storage.service.js";
import { store } from '../store/index';
import { updateOrder } from "../store/actions/order.actions.js";
import { utilService } from "./util.service.js";

const STORAGE_KEY = 'orders';
const orderChannel = new BroadcastChannel('orderChannel');

;(() => {
  orderChannel.addEventListener('message', (ev) => {
    store.dispatch(ev.data);
  });
})();


export const ordersService = {
  query,
  getById,
  save,
  remove
};


window.cs = ordersService;


async function query() {
  var fetchedOrders = await storageService.query(STORAGE_KEY);
  if (!fetchedOrders || !fetchedOrders.length) {
    console.log('no demo data for orders');
  }
  return fetchedOrders;
}

async function save(order) {
    var savedOrder
    if (order.id) {
      savedOrder = await storageService.put(STORAGE_KEY, order)
      orderChannel.postMessage(updateOrder(savedOrder))
    } else {
      order.id = utilService.makeId()
      savedOrder = await storageService.post(STORAGE_KEY, order)
    //   orderChannel.postMessage(addOrder(savedOrder))
    }
    return savedOrder
  }

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

async function remove(id) {
  await storageService.remove(STORAGE_KEY, id);
//   orderChannel.postMessage(removeOrder());
}
