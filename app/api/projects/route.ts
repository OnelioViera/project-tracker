import { NextRequest, NextResponse } from 'next/server';
import { getProjectsCollection } from '@/lib/db';
import { ObjectId } from 'mongodb';

// GET all projects
export async function GET() {
  try {
    const collection = await getProjectsCollection();
    const projects = await collection.find({}).sort({ deadline: 1 }).toArray();
    
    // Convert _id to string for JSON serialization
    const serializedProjects = projects.map(project => ({
      ...project,
      _id: project._id.toString(),
    }));
    
    return NextResponse.json(serializedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const collection = await getProjectsCollection();
    
    const newProject = {
      name: body.name,
      client: body.client,
      productTypes: body.productTypes || [],
      deadline: body.deadline,
      status: body.status || 'Draft',
      notes: body.notes || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newProject);
    
    return NextResponse.json({
      ...newProject,
      _id: result.insertedId.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

