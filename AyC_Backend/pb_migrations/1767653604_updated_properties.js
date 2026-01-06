/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fe48cru7v9e6fln")

  collection.listRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"
  collection.viewRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"
  collection.createRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"
  collection.updateRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"
  collection.deleteRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || agent = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fe48cru7v9e6fln")

  collection.listRule = "@request.auth.role = \"admin\" || agent = @request.auth.id"
  collection.viewRule = "@request.auth.role = \"admin\" || agent = @request.auth.id"
  collection.createRule = "@request.auth.id != \"\" && (@request.auth.role = \"admin\" || agent = @request.auth.id)"
  collection.updateRule = "@request.auth.role = \"admin\" || agent = @request.auth.id"
  collection.deleteRule = "@request.auth.role = \"admin\" || agent = @request.auth.id"

  return dao.saveCollection(collection)
})
