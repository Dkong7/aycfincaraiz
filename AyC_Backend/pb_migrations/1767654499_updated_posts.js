/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fjazvd9ex3niou2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uiutkbmh",
    "name": "agent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fjazvd9ex3niou2")

  // remove
  collection.schema.removeField("uiutkbmh")

  return dao.saveCollection(collection)
})
