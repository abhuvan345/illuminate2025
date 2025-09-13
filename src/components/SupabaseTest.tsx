import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const SupabaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runTests = async () => {
      const results: string[] = [];

      try {
        results.push("🔄 Testing Supabase connection...");

        // Test 1: Basic connection
        const { error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          results.push(`❌ Connection failed: ${sessionError.message}`);
        } else {
          results.push("✅ Supabase client connection successful");
        }

        // Test 2: Database table access
        try {
          const { error: tableError } = await supabase
            .from("registrations")
            .select("id", { count: "exact", head: true });

          if (tableError) {
            results.push(`❌ Database error: ${tableError.message}`);
            results.push(
              "💡 You need to run the SQL setup script in your Supabase dashboard"
            );
          } else {
            results.push('✅ Database table "registrations" accessible');
            // Try to get actual count
            const { count, error: countError } = await supabase
              .from("registrations")
              .select("*", { count: "exact", head: true });

            if (!countError && count !== null) {
              results.push(`📊 Current registrations count: ${count}`);
            }
          }
        } catch (dbError) {
          results.push(`❌ Database connection failed: ${dbError}`);
        }

        // Test 3: Storage bucket access
        try {
          const { error: bucketError } = await supabase.storage
            .from("registration-files")
            .list("", { limit: 1 });

          if (bucketError) {
            results.push(`❌ Storage error: ${bucketError.message}`);
            results.push(
              '💡 You need to create the "registration-files" storage bucket'
            );
          } else {
            results.push('✅ Storage bucket "registration-files" accessible');
          }
        } catch (storageError) {
          results.push(`❌ Storage connection failed: ${storageError}`);
        }

        // Test 4: Environment variables
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (url && key) {
          results.push("✅ Environment variables loaded correctly");
          results.push(`📍 URL: ${url}`);
          results.push(`🔑 Key: ${key.substring(0, 20)}...`);
        } else {
          results.push("❌ Environment variables missing");
        }
      } catch (error) {
        results.push(`❌ Unexpected error: ${error}`);
      }

      setTestResults(results);
      setIsLoading(false);
    };

    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">
          Supabase Connection Test
        </h1>

        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-400"></div>
            <span>Running tests...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  result.startsWith("✅")
                    ? "bg-green-900/50 border border-green-400"
                    : result.startsWith("❌")
                    ? "bg-red-900/50 border border-red-400"
                    : result.startsWith("💡")
                    ? "bg-blue-900/50 border border-blue-400"
                    : result.startsWith("🔄")
                    ? "bg-yellow-900/50 border border-yellow-400"
                    : "bg-gray-800 border border-gray-600"
                }`}
              >
                <code className="text-sm">{result}</code>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Next Steps:</h3>
          <ul className="space-y-2 text-sm">
            <li>
              1. If you see database errors, run the SQL script in your Supabase
              dashboard
            </li>
            <li>
              2. If you see storage errors, create the "registration-files"
              bucket
            </li>
            <li>
              3. If all tests pass, your registration form is ready to use!
            </li>
          </ul>
        </div>

        <div className="mt-6 flex space-x-4">
          <a
            href="/"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
          >
            Go to Registration Form
          </a>
          <a
            href="/admin"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Go to Admin Panel
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupabaseTest;
