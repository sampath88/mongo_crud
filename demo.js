const { MongoClient, ServerApiVersion } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://sampath96:sampath@cluster1.04mh4bj.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);
  try {
    console.log("Connecting...");
    await client.connect();
    console.log("Connected to client");
    // await listDatabases(client);
    await createListing(client, {
      name: "Lovely Loft",
      summary: "A charming loft in paris",
      bedrooms: 1,
      bathrooms: 1,
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function createListing(client, newListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);

  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function listDatabases(client) {
  const databaseList = await client.db().admin().listDatabases();
  console.log("Databases");
  databaseList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
