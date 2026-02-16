'use client';

import { useCallback } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

interface MeshUploaderProps {
  onMeshLoaded: (geometry: THREE.BufferGeometry, filename: string) => void;
}

export default function MeshUploader({ onMeshLoaded }: MeshUploaderProps) {
  const handleFileUpload = useCallback((file: File) => {
    const filename = file.name;
    const extension = filename.split('.').pop()?.toLowerCase();

    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target?.result;

      if (!contents) {
        alert('Failed to read file');
        return;
      }

      try {
        if (extension === 'obj') {
          const loader = new OBJLoader();
          const obj = loader.parse(contents as string);

          // Extract geometry from the loaded object
          let foundGeometry: THREE.BufferGeometry | null = null;

          obj.traverse((child) => {
            if (child instanceof THREE.Mesh && !foundGeometry) {
              foundGeometry = child.geometry;
            }
          });

          if (foundGeometry) {
            let geometry: THREE.BufferGeometry = foundGeometry;

            // Ensure geometry is indexed
            if (!geometry.index) {
              geometry = geometry.toNonIndexed();
              geometry = mergeVertices(geometry);
            }

            // Compute normals if not present
            if (!geometry.attributes.normal) {
              geometry.computeVertexNormals();
            }

            onMeshLoaded(geometry, filename);
          } else {
            alert('No mesh found in OBJ file');
          }
        } else if (extension === 'glb' || extension === 'gltf') {
          const loader = new GLTFLoader();

          const loadGLTF = (data: string | ArrayBuffer) => {
            loader.parse(
              data,
              '',
              (gltf) => {
                let foundGeometry: THREE.BufferGeometry | null = null;

                gltf.scene.traverse((child) => {
                  if (child instanceof THREE.Mesh && !foundGeometry) {
                    foundGeometry = child.geometry;
                  }
                });

                if (foundGeometry) {
                  let geometry: THREE.BufferGeometry = foundGeometry;

                  // Ensure geometry is indexed
                  if (!geometry.index) {
                    geometry = geometry.toNonIndexed();
                    geometry = mergeVertices(geometry);
                  }

                  // Compute normals if not present
                  if (!geometry.attributes.normal) {
                    geometry.computeVertexNormals();
                  }

                  onMeshLoaded(geometry, filename);
                } else {
                  alert('No mesh found in GLTF file');
                }
              },
              (error) => {
                console.error('GLTF parsing error:', error);
                alert('Failed to parse GLTF file');
              }
            );
          };

          if (typeof contents === 'string') {
            loadGLTF(contents);
          } else {
            loadGLTF(contents as ArrayBuffer);
          }
        } else {
          alert('Unsupported file format. Please use OBJ or GLB/GLTF files.');
        }
      } catch (error) {
        console.error('Error loading mesh:', error);
        alert('Failed to load mesh file');
      }
    };

    if (extension === 'obj' || extension === 'gltf') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }, [onMeshLoaded]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-800"
      >
        <input
          type="file"
          accept=".obj,.glb,.gltf"
          onChange={handleFileInput}
          className="hidden"
          id="mesh-file-input"
        />
        <label htmlFor="mesh-file-input" className="cursor-pointer">
          <div className="space-y-2">
            <div className="text-4xl">📦</div>
            <div className="text-lg font-semibold text-white">
              Drop 3D mesh here or click to browse
            </div>
            <div className="text-sm text-gray-400">
              Supported formats: OBJ, GLB, GLTF
            </div>
          </div>
        </label>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-300">
        <div className="font-semibold mb-2">Tips:</div>
        <ul className="list-disc list-inside space-y-1">
          <li>Use manifold meshes without holes</li>
          <li>Keep triangle count under 50,000 for best performance</li>
          <li>Meshes will be processed entirely in your browser</li>
        </ul>
      </div>
    </div>
  );
}
