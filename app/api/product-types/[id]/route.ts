import { NextRequest, NextResponse } from 'next/server';
import { getProductTypesCollection, getProjectsCollection } from '@/lib/db';
import { ObjectId } from 'mongodb';

// DELETE product type
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await getProductTypesCollection();
    const projectsCollection = await getProjectsCollection();
    
    // Get the product type name before deleting
    const productType = await collection.findOne({ _id: new ObjectId(params.id) });
    
    if (!productType) {
      return NextResponse.json(
        { error: 'Product type not found' },
        { status: 404 }
      );
    }
    
    // Delete the product type
    await collection.deleteOne({ _id: new ObjectId(params.id) });
    
    // Remove this product type from all projects
    await projectsCollection.updateMany(
      { productTypes: productType.name },
      { $pull: { productTypes: productType.name } }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product type:', error);
    return NextResponse.json(
      { error: 'Failed to delete product type' },
      { status: 500 }
    );
  }
}

