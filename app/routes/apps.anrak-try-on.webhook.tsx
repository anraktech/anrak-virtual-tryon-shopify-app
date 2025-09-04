import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createTryOnStat, updateTryOnStat } from "../models/stats.server";
import { getSettings } from "../models/settings.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const shop = formData.get("shop") as string;
    const productId = formData.get("productId") as string;
    const variantId = formData.get("variantId") as string;
    const userImage = formData.get("userImage") as string;
    
    if (!shop || !productId || !userImage) {
      return json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Get settings for webhook URL
    const settings = await getSettings(shop);
    const webhookUrl = settings.webhookUrl || "https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen";

    // Create initial stat record
    const stat = await createTryOnStat({
      shop,
      productId,
      variantId,
      status: "processing",
      userImage: userImage.substring(0, 100) + "...", // Truncate for storage
    });

    const startTime = Date.now();

    try {
      // Forward request to N8N webhook
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shop,
          productId,
          variantId,
          userImage,
          statId: stat.id,
        }),
      });

      const processingTime = Date.now() - startTime;

      if (!webhookResponse.ok) {
        // Update stat with error
        await updateTryOnStat(stat.id, {
          status: "error",
          errorReason: `Webhook failed: ${webhookResponse.status} ${webhookResponse.statusText}`,
          processingTime,
        });

        return json({ 
          error: "Webhook request failed", 
          details: await webhookResponse.text() 
        }, { status: 500 });
      }

      const result = await webhookResponse.json();

      // Update stat with success
      await updateTryOnStat(stat.id, {
        status: "success",
        resultImage: result.imageUrl || result.image,
        processingTime,
      });

      return json({
        success: true,
        resultImage: result.imageUrl || result.image,
        processingTime,
        statId: stat.id,
      });

    } catch (webhookError) {
      const processingTime = Date.now() - startTime;
      
      // Update stat with error
      await updateTryOnStat(stat.id, {
        status: "error",
        errorReason: `Network error: ${webhookError instanceof Error ? webhookError.message : 'Unknown error'}`,
        processingTime,
      });

      return json({ 
        error: "Network error when calling webhook",
        details: webhookError instanceof Error ? webhookError.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Webhook route error:", error);
    return json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
};

// Handle GET requests for testing
export const loader = async () => {
  return json({
    message: "ANRAK Virtual Try-On Webhook Endpoint",
    methods: ["POST"],
    requiredParams: ["shop", "productId", "userImage"],
    optionalParams: ["variantId"],
    webhookUrl: "https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen",
  });
};