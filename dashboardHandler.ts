
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

        const html = await Deno.readTextFile("public/dashboard.html");
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
