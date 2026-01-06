/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || id = @request.auth.id"
  collection.viewRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || id = @request.auth.id"
  collection.createRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || id = @request.auth.id"
  collection.updateRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || id = @request.auth.id"
  collection.deleteRule = "@request.auth.role = \"Alfonso\" || @request.auth.role = \"Claudia\" || id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "id = @request.auth.id"
  collection.viewRule = "id = @request.auth.id"
  collection.createRule = ""
  collection.updateRule = "id = @request.auth.id"
  collection.deleteRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
})
