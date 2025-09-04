import { prisma } from "./db.server";

export async function createTryOnStat({
  shop,
  productId,
  variantId,
  status,
  errorReason,
  userImage,
  resultImage,
  processingTime,
}: {
  shop: string;
  productId: string;
  variantId?: string;
  status: string;
  errorReason?: string;
  userImage?: string;
  resultImage?: string;
  processingTime?: number;
}) {
  return await prisma.tryOnStats.create({
    data: {
      shop,
      productId,
      variantId,
      status,
      errorReason,
      userImage,
      resultImage,
      processingTime,
    },
  });
}

export async function updateTryOnStat(id: string, data: {
  status?: string;
  errorReason?: string;
  resultImage?: string;
  processingTime?: number;
}) {
  return await prisma.tryOnStats.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
}

export async function getTryOnStats(shop: string, limit = 50) {
  return await prisma.tryOnStats.findMany({
    where: { shop },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function getTryOnStatsByProduct(shop: string, productId: string) {
  return await prisma.tryOnStats.findMany({
    where: { 
      shop,
      productId 
    },
    orderBy: { createdAt: 'desc' },
  });
}