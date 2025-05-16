import { setCookie } from "https://deno.land/std@0.201.0/http/cookie.ts";
import { createSession } from "./sessionHandler.ts";

export async function handleLogin(req: Request): Promise<Response> {

  const formData = await req.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  console.log("LoginHandler: Login attempt:", username, password);
  console.log(formData)

  if (username === "admin" && password === "kode") {

    const token = createSession();

    console.log("LoginHandler.ts : Session token:", token);
    // Forbered headers og sæt cookie med setCookie
    
    const headers = new Headers({"Location": "/dashboard",});

    setCookie(headers, {name: "session",value: token,httpOnly: true,path: "/",maxAge: 36000 });

    console.log("LoginHandler.ts : Cookie set with token:", token);

    return new Response(null, {
      status: 302,
      headers,
    });

  } else {
    
    return new Response("Login fejlede!", { status: 401 });
  
}
}
