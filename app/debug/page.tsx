'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DebugPage() {
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await fetch('/api/product-types');
      const data = await response.json();
      console.log('Fetched product types:', data);
      setProductTypes(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testDelete = async (id: string) => {
    setTestResult('Testing delete for ID: ' + id);
    console.log('Testing delete for ID:', id);
    
    try {
      const response = await fetch(`/api/product-types/${id}`, {
        method: 'DELETE'
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        setTestResult('✅ Delete successful! ' + JSON.stringify(data));
        fetchProductTypes(); // Refresh the list
      } else {
        setTestResult('❌ Delete failed: ' + JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error:', error);
      setTestResult('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>🔍 Debug Product Types Deletion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              This page helps debug the delete functionality. Open your browser console (F12) to see detailed logs.
            </p>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Current Product Types:</h3>
              {productTypes.length === 0 ? (
                <p className="text-slate-500">No product types found</p>
              ) : (
                <div className="space-y-2">
                  {productTypes.map((type) => (
                    <div key={type._id} className="flex items-center justify-between bg-white p-3 rounded border">
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-xs text-slate-500">ID: {type._id}</div>
                      </div>
                      <Button
                        onClick={() => testDelete(type._id)}
                        variant="destructive"
                        size="sm"
                      >
                        Test Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4">
              <Button onClick={fetchProductTypes} variant="outline">
                Refresh List
              </Button>
            </div>

            {testResult && (
              <div className="mt-4 p-4 bg-slate-100 rounded">
                <h3 className="font-semibold mb-2">Test Result:</h3>
                <pre className="text-xs whitespace-pre-wrap">{testResult}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>1. Open browser console (F12)</p>
            <p>2. Click "Test Delete" on any product type</p>
            <p>3. Check the console for detailed logs (marked with 🔴)</p>
            <p>4. Check the terminal where your dev server is running for backend logs</p>
            <p>5. Share any error messages you see</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

