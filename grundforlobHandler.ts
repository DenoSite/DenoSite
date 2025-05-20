
import { getCookies } from "https://deno.land/std@0.201.0/http/cookie.ts";
import { isValidSession } from "./sessionHandler.ts";

export async function grundforlobHandler(req: Request): Promise<Response> {
    
    console.log("grundforlobHandler.ts : grundforlobHandler called");

    // Check if the request has a valid session token
    const cookies = getCookies(req.headers);
    const token = cookies.session || null;

    console.log("grundforlobHandler.ts : grundforlobHandler - Cookie-Session token:", token);

    if (isValidSession(token)) {

        console.log("grundforlobHandler.ts : grundforlobHandler- valid session token:", token);

        const html = await Deno.readTextFile("public/matematikGF.html");
        return new Response(html, {
            headers: {  "Content-Type": "text/html",
                        "Cache-Control": "no-store",
             },
        });

    }   else {
        //fejl
        console.log("Invalid session token:", token);
        return new Response("Unauthorized", { status: 401 });
    }


}
