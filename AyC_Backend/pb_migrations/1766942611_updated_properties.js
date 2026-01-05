/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fe48cru7v9e6fln")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cdy73ws4",
    "name": "is_opportunity",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxorn0ff",
    "name": "is_ayc_favorite",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u6khdauu",
    "name": "hero_order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fe48cru7v9e6fln")

  // remove
  collection.schema.removeField("cdy73ws4")

  // remove
  collection.schema.removeField("zxorn0ff")

  // remove
  collection.schema.removeField("u6khdauu")

  return dao.saveCollection(collection)
})
