export interface ProcessMessage {
    message: string
    timestamp: string // Format: [00:00:01]
    indent?: boolean
}
export const RAW_PROCESS_MESSAGES = [
    {
        name: "✅ Step 1: Connect Your Practice",
        messages: [
            { message: "🟢 Initializing Patient Reactivation Engine v10...", timestamp: "[00:00:01]" },
            { message: "🧠 Loading integration modules: Open Dental / Eaglesoft / Dentrix / Curve...", timestamp: "[00:00:03]" },
            { message: "📦 Target system detected: Open Dental", timestamp: "[00:00:05]" },
            { message: "🔌 Initiating connection with clinic database...", timestamp: "[00:00:07]" },
            { message: "🔐 Checking API credentials...", timestamp: "[00:00:10]" },
            { message: "✅ API Key is valid and active", timestamp: "[00:00:12]", indent: true },
            { message: "🔑 Requesting secure access token from Open Dental Auth Server...", timestamp: "[00:00:14]" },
            { message: "🔄 Awaiting handshake...", timestamp: "[00:00:17]", indent: true },
            { message: "✅ Token received (session active)", timestamp: "[00:00:19]", indent: true },
            { message: "🔗 Establishing an encrypted link to clinic environment...", timestamp: "[00:00:21]" },
            { message: "🧬 Syncing clinic schema, timezone, and timezone offset", timestamp: "[00:00:23]", indent: true },
            { message: "✅ Connection established with Clinic #037", timestamp: "[00:00:25]", indent: true },
            { message: "👥 Pulling provider directory from PMS...", timestamp: "[00:00:27]" },
            { message: "✅ 1 active provider found: Dr. John Smith (General Dentist)", timestamp: "[00:00:29]", indent: true }
        ]
    },
        {
            name: "📥 Step 2: Import Patient Database",
            messages: [
                { message: "📁 Preparing to import patient data...", timestamp: "[00:00:31]" },
                { message: "📡 Connecting to patient records endpoint: /api/patients", timestamp: "[00:00:33]", indent: true },
                { message: "🔍 Checking data access permissions...", timestamp: "[00:00:36]", indent: true },
                { message: "✅ Permissions granted: Read-only / Historical Access Enabled", timestamp: "[00:00:38]", indent: true },
                { message: "📊 Detecting patient record format...", timestamp: "[00:00:40]" },
                { message: "✅ Format detected: Open Dental v23.2 schema", timestamp: "[00:00:41]", indent: true },
                { message: "⏳ Fetching patient dataset (active, inactive, archived)...", timestamp: "[00:00:43]" },
                { message: "⚠️ Network instability detected — retrying with exponential backoff...", timestamp: "[00:00:47]", indent: true },
                { message: "✅ Data stream restored — 1441 records retrieved (12.4MB)", timestamp: "[00:00:51]", indent: true },
                { message: "🧮 Indexing patient profiles...", timestamp: "[00:00:54]" },
                { message: "🧾 Parsing key fields: Name, DOB, Last Visit, Treatment Plan, Insurance", timestamp: "[00:00:56]", indent: true },
                { message: "✅ Segmenting records please wait", timestamp: "[00:00:59]", indent: true },
                { message: "✅ 1441 Patient database successfully imported and structured", timestamp: "[00:01:02]" }
            ]
        },
        {
            name: "🔍 Step 3: Scan Patient Database",
            messages: [
                { message: "🧠 Starting patient intelligence scan...", timestamp: "[00:01:04]" },
                { message: "📆 Running 'last visit' analysis (cutoff: >6 months)...", timestamp: "[00:01:06]" },
                { message: "✅ 341 patients flagged as inactive", timestamp: "[00:01:08]", indent: true },
                { message: "📄 Pulling patient notes for flagged patients...", timestamp: "[00:01:10]" },
                { message: "✅ 341 patient notes retrieved", timestamp: "[00:01:14]", indent: true },
                { message: "🧾 Parsing note content: Subjective / Objective / Assessment / Plan", timestamp: "[00:01:15]", indent: true },
                { message: "🧠 Activating Recall Pattern Engine...", timestamp: "[00:01:18]" },
                {
                    message: "🔍 Looking for embedded clinical intent:\n           • Missed follow-ups\n           • Monitor instructions\n           • Deferred treatment plans\n           • Unscheduled evaluations",
                    timestamp: "[00:01:20]",
                    indent: true
                },
                { message: "🧩 Matching note insights to internal recall models...", timestamp: "[00:01:24]" },
                { message: "✅ 305 patients matched with high-signal recall phrases", timestamp: "[00:01:27]", indent: true },
                {
                    message: "📊 Breakdown of triggers:\n           - 103 'Return in 6 months'\n           - 71 'Monitor condition'\n           - 88 'Early Signs'\n           - 43 'Treatment Plan Pending'",
                    timestamp: "[00:01:29]",
                    indent: true
                },
                { message: "🩻 Checking for available image repo data...", timestamp: "[00:01:32]" },
                { message: "⚠️ 631/1441 patients missing recent xrays", timestamp: "[00:01:34]", indent: true },
                { message: "🔎 Preparing list...", timestamp: "[00:01:35]" },
                { message: "✅ Final reactivation list prepared — 936 patients", timestamp: "[00:01:39]" },
                { message: "📊 Aggregating spend history for inactive patients...", timestamp: "[00:01:43]" },
                { message: "🧾 Calculating average annual spend per patient...", timestamp: "[00:01:45]", indent: true },
                { message: "✅ Avg spend per year: $1,780.34", timestamp: "[00:01:47]", indent: true },
                { message: "🔍 Filtering out one-time and low-lifetime-value patients...", timestamp: "[00:01:49]" },
                { message: "✅ 231 high-value inactive patients retained", timestamp: "[00:01:52]", indent: true },
                { message: "💡 Projecting missed revenue based on pre-churn behavior...", timestamp: "[00:01:54]" },
                {
                    message: "🧠 Calculating and estimating revenue potential using:\n           • Visit frequency\n           • Past recall responsiveness\n           • Treatment complexity\n           • Provider availability",
                    timestamp: "[00:01:56]",
                    indent: true
                },
                { message: "💰 Potential revenue opportunity: **$178,000**", timestamp: "[00:01:58]" },
                { message: "✅ Revenue report generated", timestamp: "[00:02:00]" }
            ]
        }
];