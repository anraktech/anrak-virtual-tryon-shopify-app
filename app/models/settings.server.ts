import { prisma } from "./db.server";

export async function getSettings(shop: string) {
  const settings = await prisma.settings.findUnique({
    where: { shop },
  });
  
  if (!settings) {
    return await createSettings(shop);
  }
  
  return settings;
}

export async function createSettings(shop: string) {
  return await prisma.settings.create({
    data: {
      shop,
      webhookUrl: "https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen",
      isActive: true,
    },
  });
}

export async function updateSettings(shop: string, data: {
  openrouterKey?: string;
  webhookUrl?: string;
  isActive?: boolean;
}) {
  return await prisma.settings.upsert({
    where: { shop },
    update: data,
    create: {
      shop,
      ...data,
      webhookUrl: data.webhookUrl || "https://n8n.srv920226.hstgr.cloud/webhook/gemini-image-gen",
    },
  });
}