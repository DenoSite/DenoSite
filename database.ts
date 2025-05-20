const kv = await Deno.openKv();

await kv.set(["test"], "lokal data");

const result = await kv.get(["test"]);

console.log("Hentet fra KV:", result.value); // "lokal data"