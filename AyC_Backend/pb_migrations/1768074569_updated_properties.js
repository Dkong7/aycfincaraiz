/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fe48cru7v9e6fln")

  collection.listRule = "status = \"publicado\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fe48cru7v9e6fln")

  collection.listRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"

  return dao.saveCollection(collection)
})
