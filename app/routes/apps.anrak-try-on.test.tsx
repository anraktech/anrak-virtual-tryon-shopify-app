import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createTryOnStat } from "../models/stats.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop") || "test-shop.myshopify.com";
  
  try {
    // Test database connection
    const testStat = await createTryOnStat({
      shop: shop,
      productId: "test-product-123",
      variantId: "test-variant-456",
      status: "test",
      userImage: "data:image/jpeg;base64,test",
    });

    // Test N8N webhook
    const webhookUrl = "https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen";
    let webhookStatus = "unknown";
    let webhookError = null;

    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          test: true,
          shop: shop,
          productId: "test-product-123",
          userImage: "data:image/jpeg;base64,test-image",
        }),
      });
      webhookStatus = webhookResponse.ok ? "success" : "error";
      if (!webhookResponse.ok) {
        webhookError = `${webhookResponse.status} ${webhookResponse.statusText}`;
      }
    } catch (error) {
      webhookStatus = "error";
      webhookError = error instanceof Error ? error.message : 'Unknown error';
    }

    return json({
      status: "success",
      timestamp: new Date().toISOString(),
      shop: shop,
      tests: {
        database: {
          status: "success",
          statId: testStat.id,
          message: "Successfully created test stat record"
        },
        webhook: {
          status: webhookStatus,
          url: webhookUrl,
          error: webhookError,
          message: webhookStatus === "success" ? "Webhook is accessible" : "Webhook test failed"
        }
      },
      endpoints: {
        webhook: "/apps/anrak-try-on/webhook",
        test: "/apps/anrak-try-on/test"
      },
      appProxy: {
        configured: true,
        pattern: "/apps/anrak-try-on/*",
        baseUrl: process.env.HOST || process.env.SHOPIFY_APP_URL || "not-configured"
      }
    });

  } catch (error) {
    return json({
      status: "error",
      timestamp: new Date().toISOString(),
      shop: shop,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: "Test failed - check database connection and environment variables"
    }, { status: 500 });
  }
};