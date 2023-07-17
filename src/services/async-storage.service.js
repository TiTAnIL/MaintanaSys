export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType, delay = 600) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('query entitites', entityType, entities)
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            return entities.find(entity => entity.id === entityId)
        })
}


function post(entityType, newEntity) {
    newEntity.id = newEntity.id || _makeId()
    return query(entityType)
        .then(entities => {
            entities.unshift(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}


function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}


function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity.id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}


function postMany(entityType, newNetities) {
    console.log('ettype', entityType, newNetities)
    return query(entityType, newNetities)
        .then(entities => {
            newNetities = newNetities.map(entity => ({ ...entity, id: (entity.id) ? entity.id : _makeId() }))
            console.log('asdas', newNetities)
            entities.push(...newNetities)
            _save(entityType, entities)
            return entities
        })
}


function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

