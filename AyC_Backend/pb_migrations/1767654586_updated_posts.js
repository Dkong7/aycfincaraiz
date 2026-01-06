/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fjazvd9ex3niou2")

  collection.listRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"
  collection.viewRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"
  collection.createRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"
  collection.updateRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"
  collection.deleteRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fjazvd9ex3niou2")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})
