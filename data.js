export async function fetchJsonData() {
   try {
      const response = await fetch("https://9ks3m4-8080.csb.app/data", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });
      const data = await response.json();
      return data;
   } catch (e) {
      throw new Error(e);
   }
}
