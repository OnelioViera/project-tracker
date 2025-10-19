import clientPromise from './mongodb';

export async function getDatabase() {
  const client = await clientPromise;
  return client.db('project-tracker');
}

export async function getProjectsCollection() {
  const db = await getDatabase();
  return db.collection('projects');
}

export async function getProductTypesCollection() {
  const db = await getDatabase();
  return db.collection('productTypes');
}

