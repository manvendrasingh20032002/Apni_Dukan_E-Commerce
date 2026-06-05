const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");
require("dotenv").config();

// We default to the Atlas connection string from .env
const dbKey = process.env.DB_KEY || "mongodb+srv://vishank:Ducat123@cluster0.xlhzixp.mongodb.net/apnidukan";
console.log("Database Key:", dbKey);

const seedFiles = [
    { file: "apnidukan.brands.json", collection: "brands" },
    { file: "apnidukan.products.json", collection: "products" },
    { file: "apnidukan.maincategories.json", collection: "maincategories" },
    { file: "apnidukan.subcategories.json", collection: "subcategories" },
    { file: "apnidukan.features.json", collection: "features" },
    { file: "apnidukan.faqs.json", collection: "faqs" },
    { file: "apnidukan.settings.json", collection: "settings" },
    { file: "apnidukan.testimonials.json", collection: "testimonials" },
    { file: "apnidukan.users.json", collection: "users" },
    { file: "apnidukan.checkouts.json", collection: "checkouts" },
    { file: "apnidukan.contactus.json", collection: "contactus" },
    { file: "apnidukan.newsletters.json", collection: "newsletters" },
    { file: "apnidukan.wishlists.json", collection: "wishlists" }
];

function convertExtendedJson(obj) {
    if (obj === null || obj === undefined) return obj;
    if (Array.isArray(obj)) {
        return obj.map(convertExtendedJson);
    }
    if (typeof obj === "object") {
        if (obj.$oid) {
            return new ObjectId(obj.$oid);
        }
        if (obj.$date) {
            return new Date(obj.$date);
        }
        const newObj = {};
        for (const key in obj) {
            newObj[key] = convertExtendedJson(obj[key]);
        }
        return newObj;
    }
    return obj;
}

async function run() {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(dbKey);
        console.log("Connected to MongoDB database.");
        
        const db = mongoose.connection.db;
        
        for (const item of seedFiles) {
            const filePath = path.join(__dirname, "..", item.file);
            if (!fs.existsSync(filePath)) {
                console.log(`Skipping file (not found): ${item.file}`);
                continue;
            }
            
            console.log(`Processing file: ${item.file} -> Collection: ${item.collection}`);
            const rawData = fs.readFileSync(filePath, "utf8");
            let data = JSON.parse(rawData);
            
            // Convert Extended JSON formats like $oid and $date
            data = convertExtendedJson(data);
            
            // Delete existing documents in the collection
            await db.collection(item.collection).deleteMany({});
            console.log(`Cleared existing documents in ${item.collection}`);
            
            if (data.length > 0) {
                // Insert the new documents
                const result = await db.collection(item.collection).insertMany(data);
                console.log(`Successfully imported ${result.insertedCount} documents into ${item.collection}`);
            } else {
                console.log(`No documents to import for ${item.collection}`);
            }
        }
        
        console.log("\nAll collections seeded successfully!");
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

run();
