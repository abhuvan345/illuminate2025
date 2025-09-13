import { supabase } from "./src/lib/supabase.js";

async function testSupabaseConnection() {
  console.log("Testing Supabase connection...");

  try {
    // Test basic connection
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Connection error:", error.message);
      return false;
    }

    console.log("✅ Supabase client initialized successfully");

    // Test database connection by trying to query the registrations table
    const { data: tableData, error: tableError } = await supabase
      .from("registrations")
      .select("count(*)", { count: "exact" });

    if (tableError) {
      console.error("❌ Database table error:", tableError.message);
      console.log(
        "💡 Make sure you have run the SQL setup script in your Supabase dashboard"
      );
      return false;
    }

    console.log("✅ Database connection successful");
    console.log(
      `📊 Current registrations count: ${
        tableData.length > 0 ? tableData[0].count : 0
      }`
    );

    // Test storage bucket
    const { data: bucketData, error: bucketError } = await supabase.storage
      .from("registration-files")
      .list("", { limit: 1 });

    if (bucketError) {
      console.error("❌ Storage bucket error:", bucketError.message);
      console.log(
        "💡 Make sure you have created the storage bucket in your Supabase dashboard"
      );
      return false;
    }

    console.log("✅ Storage bucket connection successful");
    return true;
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return false;
  }
}

testSupabaseConnection().then((success) => {
  if (success) {
    console.log("\n🎉 All Supabase connections are working properly!");
    console.log("Your registration form is ready to use.");
  } else {
    console.log("\n⚠️ There are issues with your Supabase setup.");
    console.log("Please check the errors above and fix them.");
  }
});
