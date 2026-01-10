/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jtw95kyn02iv3ep",
    "created": "2026-01-10 19:23:56.273Z",
    "updated": "2026-01-10 19:23:56.273Z",
    "name": "search_terms",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "e1lxx1yh",
        "name": "term",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jtw95kyn02iv3ep");

  return dao.deleteCollection(collection);
})
