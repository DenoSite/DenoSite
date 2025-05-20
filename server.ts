import { getCookies, setCookie } from "https://deno.land/std@0.201.0/http/cookie.ts";
import { handleDashboard } from "./dashboardHandler.ts";
import { grundforlobHandler } from "./grundforlobHandler.ts";
import { handleLogin } from "./loginHandler.ts";
import { deleteSession } from "./sessionHandler.ts";


Deno.serve(async (req) => {
  const url = new URL(req.url);

  // CSS
  if (url.pathname === "/styleLogin.css") {
    const css = await Deno.readTextFile("public/styleLogin.css");
    return new Response(css, {
      headers: { "Content-Type": "text/css" },
    });
  }
// CSS
  if (url.pathname === "/styleDashboard.css") {
    const css = await Deno.readTextFile("public/styleDashboard.css");
    return new Response(css, {
      headers: { "Content-Type": "text/css" },
    });
  }


  // Login POST
  if (url.pathname === "/login" && req.method === "POST") {
    return await handleLogin(req);
  }

  // Logout GET
  if (url.pathname === "/logout" && req.method === "GET") {

    const headers = new Headers({"Location": "/","Content-Type": "text/html"});

    console.log("server.ts: Logout called - nu skulle en cookie sættes med tom værdi");
    //delete session cookie
    const cookies = getCookies(req.headers);
    const token = cookies.session || "";

    //deletes session on server
    console.log("server.ts: Logout called - skulle gerne fjerne token fra server:", token);
    deleteSession(token);

    setCookie(headers, {name: "session", value : token, httpOnly: true,path: "/",maxAge: 0 });


  // Jeg redirecter til ingenting - hvilket resulterer i Standard: login-formular 
 return new Response(null, {
      status: 302,
      headers,
    });
  }


  // dashboard GET
  if (url.pathname === "/dashboard" && req.method === "GET") {
    return await handleDashboard(req);
  }

  // dashboard GET
  if (url.pathname === "/grundforlob" && req.method === "GET") {
    return await grundforlobHandler(req);
  }




  // Standard: login-formular
  const html = await Deno.readTextFile("public/login.html");
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
});
