// Test script to check database schema and status column
import { supabase } from "./src/lib/supabase.js";

async function testDatabaseSchema() {
  console.log("🔍 Testing database schema...");

  try {
    // Test if we can query with status column
    console.log("📋 Checking if status column exists...");
    const { data, error } = await supabase
      .from("registrations")
      .select("id, full_name, payment_verified, status")
      .limit(1);

    if (error) {
      console.error("❌ Error querying with status column:", error.message);
      if (error.message.includes('column "status" does not exist')) {
        console.log(
          "🚨 STATUS COLUMN DOES NOT EXIST! You need to run the migration."
        );
        return false;
      }
    } else {
      console.log("✅ Status column exists!");
      console.log("📊 Sample data:", data);
      return true;
    }

    // Test basic query without status
    console.log("📋 Testing basic query...");
    const { data: basicData, error: basicError } = await supabase
      .from("registrations")
      .select("id, full_name, payment_verified")
      .limit(3);

    if (basicError) {
      console.error("❌ Basic query error:", basicError.message);
      return false;
    }

    console.log("✅ Basic query successful");
    console.log("📊 Current registrations:", basicData);
  } catch (error) {
    console.error("❌ Connection error:", error.message);
    return false;
  }
}

testDatabaseSchema();
