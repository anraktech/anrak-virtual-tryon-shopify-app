import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);

  return json({
    shop: session.shop,
    appUrl: process.env.SHOPIFY_APP_URL || process.env.HOST,
  });
};

export default function Index() {
  const { shop, appUrl } = useLoaderData<typeof loader>();

  return (
    <div style={{ 
      fontFamily: "system-ui, sans-serif", 
      lineHeight: "1.8",
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h1>ANRAK Virtual Try-On App</h1>
      <p>Welcome to your virtual try-on experience for shop: <strong>{shop}</strong></p>
      
      <div style={{ 
        background: "#f8f9fa", 
        padding: "1.5rem", 
        borderRadius: "8px", 
        margin: "2rem 0" 
      }}>
        <h2>App Status</h2>
        <p>✅ App is successfully installed and running</p>
        <p>📱 Theme extension ready for installation</p>
        <p>🔗 Webhook endpoint: <code>/apps/anrak-try-on/webhook</code></p>
      </div>

      <div style={{ 
        background: "#e8f5e8", 
        padding: "1.5rem", 
        borderRadius: "8px" 
      }}>
        <h3>Next Steps:</h3>
        <ol>
          <li>Install the theme extension on your store</li>
          <li>Configure your N8N webhook URL in settings</li>
          <li>Test the virtual try-on feature on product pages</li>
        </ol>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <p>
          <strong>App Proxy URL:</strong> <code>{appUrl}/apps/anrak-try-on/*</code>
        </p>
        <p>
          <strong>N8N Webhook:</strong> <code>https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen</code>
        </p>
      </div>
    </div>
  );
}