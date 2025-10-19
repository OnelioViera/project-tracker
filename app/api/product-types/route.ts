import { NextRequest, NextResponse } from 'next/server';
import { getProductTypesCollection } from '@/lib/db';
import { DEFAULT_PRODUCT_TYPES } from '@/types';

// GET all product types
export async function GET() {
  try {
    const collection = await getProductTypesCollection();
    let productTypes = await collection.find({}).sort({ name: 1 }).toArray();
    
    // If no product types exist, initialize with defaults
    if (productTypes.length === 0) {
      const defaultTypes = DEFAULT_PRODUCT_TYPES.map(name => ({
        name,
        createdAt: new Date(),
      }));
      
      await collection.insertMany(defaultTypes);
      productTypes = await collection.find({}).sort({ name: 1 }).toArray();
    }
    
    // Convert _id to string for JSON serialization
    const serializedTypes = productTypes.map(type => ({
      ...type,
      _id: type._id.toString(),
    }));
    
    return NextResponse.json(serializedTypes);
  } catch (error) {
    console.error('Error fetching product types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product types' },
      { status: 500 }
    );
  }
}

// POST new product type
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const collection = await getProductTypesCollection();
    
    // Check if product type already exists
    const existing = await collection.findOne({ name: body.name });
    if (existing) {
      return NextResponse.json(
        { error: 'Product type already exists' },
        { status: 400 }
      );
    }
    
    const newProductType = {
      name: body.name,
      createdAt: new Date(),
    };
    
    const result = await collection.insertOne(newProductType);
    
    return NextResponse.json({
      ...newProductType,
      _id: result.insertedId.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product type:', error);
    return NextResponse.json(
      { error: 'Failed to create product type' },
      { status: 500 }
    );
  }
}

