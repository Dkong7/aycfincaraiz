/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fe48cru7v9e6fln")

  collection.listRule = "status != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fe48cru7v9e6fln")

  collection.listRule = "status = \"publicado\""

  return dao.saveCollection(collection)
})
