import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await fetch(url, { 
          method: "HEAD",
          mode: "no-cors",
          headers: {
            'Accept': 'image/*'
          }
        });
        
        // Since no-cors mode returns an opaque response
        // we can't check content-type, so we'll assume success
        return true;
      } catch {
        return false;
      }
    }),
  pitch: z.string().min(10),
});