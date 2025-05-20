
import { getCookies } from "https://deno.land/std@0.201.0/http/cookie.ts";
import { isValidSession } from "./sessionHandler.ts";

export async function handleDashboard(req: Request): Promise<Response> {
    
    console.log("dashboardHandler.ts : handleDashboard called");

    // Check if the request has a valid session token
    const cookies = getCookies(req.headers);
    const token = cookies.session || null;

    console.log("dashboardHandler.ts : handleDashboard - Cookie-Session token:", token);

    if (isValidSession(token)) {

        console.log("dashboardHandler.ts : handleDashboard - valid session token:", token);

        //tester den lokale KV database//////////////////////////////
        const kv = await Deno.openKv();

        const counterKey = ["counter"];
        const currentValue = (await kv.get(counterKey)).value ?? 0;
        const current = typeof currentValue === "number" ? currentValue : 0;

        // Forøg med 1
        const newCount = current + 1;

        console.log(newCount)

        // Gem den opdaterede værdi
        await kv.set(counterKey, newCount);


        await kv.set(["token"+ newCount], token);

        const entries = kv.list({ prefix: [] });
            const items: string[] = [];

        for await (const entry of entries) {
        // Filtrér kun tokens, hvis du kun vil vise dem
            if (Array.isArray(entry.key) && typeof entry.key[0] === "string" && entry.key[0].startsWith("token")) {
                items.push(`<li>${entry.value}</li>`);
            }
        }

         const userListHtml = items.join("");
        ////////////////////////////////////////////////////////////

        let html = await Deno.readTextFile("public/dashboard.html");

        // Erstat {{users}} med genereret liste
        html = html.replace("{{users}}", userListHtml);


        return new Response(html, {
            headers: {  "Content-Type": "text/html",
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        "Pragma": "no-cache",
                        "Expires": "0",
                        "X-Content-Type-Options": "nosniff",
             },
        });

    }   else {
        //fejl
        console.log("Invalid session token:", token);
        return new Response("Unauthorized", { status: 401 });
    }


}


