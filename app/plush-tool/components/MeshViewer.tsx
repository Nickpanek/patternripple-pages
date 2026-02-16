'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Line } from '@react-three/drei';
import * as THREE from 'three';

interface MeshViewerProps {
  geometry: THREE.BufferGeometry | null;
  seamEdges?: Set<string>;
  hoveredEdge?: string | null;
  onEdgeClick?: (edgeKey: string) => void;
  onEdgeHover?: (edgeKey: string | null) => void;
  showWireframe?: boolean;
}

function MeshObject({
  geometry,
  seamEdges = new Set(),
  hoveredEdge = null,
  onEdgeClick,
  onEdgeHover
}: MeshViewerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, raycaster, gl } = useThree();

  // Create edges geometry for wireframe
  const edgesGeometry = useMemo(() => {
    if (!geometry) return null;
    return new THREE.EdgesGeometry(geometry, 15);
  }, [geometry]);

  // Create line segments for edges
  const edgeLines = useMemo(() => {
    if (!geometry || !edgesGeometry) return null;

    const positions = edgesGeometry.attributes.position;
    const edges: { start: THREE.Vector3; end: THREE.Vector3; key: string }[] = [];

    for (let i = 0; i < positions.count; i += 2) {
      const start = new THREE.Vector3(
        positions.getX(i),
        positions.getY(i),
        positions.getZ(i)
      );
      const end = new THREE.Vector3(
        positions.getX(i + 1),
        positions.getY(i + 1),
        positions.getZ(i + 1)
      );

      // Find corresponding vertex indices
      const posAttr = geometry.attributes.position;
      let v1 = -1, v2 = -1;

      for (let j = 0; j < posAttr.count; j++) {
        const v = new THREE.Vector3(
          posAttr.getX(j),
          posAttr.getY(j),
          posAttr.getZ(j)
        );
        if (v.distanceTo(start) < 0.0001) v1 = j;
        if (v.distanceTo(end) < 0.0001) v2 = j;
      }

      if (v1 !== -1 && v2 !== -1) {
        const key = v1 < v2 ? `${v1}-${v2}` : `${v2}-${v1}`;
        edges.push({ start, end, key });
      }
    }

    return edges;
  }, [geometry, edgesGeometry]);

  const handlePointerMove = (e: any) => {
    if (!onEdgeHover || !edgeLines || !meshRef.current) return;

    const mouse = new THREE.Vector2(
      (e.clientX / gl.domElement.clientWidth) * 2 - 1,
      -(e.clientY / gl.domElement.clientHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);

    // Check intersection with mesh
    const intersects = raycaster.intersectObject(meshRef.current);

    if (intersects.length > 0) {
      const point = intersects[0].point;

      // Find closest edge
      let closestEdge: string | null = null;
      let minDist = 0.05; // threshold

      edgeLines.forEach(({ start, end, key }) => {
        const line = new THREE.Line3(start, end);
        const closest = new THREE.Vector3();
        line.closestPointToPoint(point, true, closest);
        const dist = closest.distanceTo(point);

        if (dist < minDist) {
          minDist = dist;
          closestEdge = key;
        }
      });

      onEdgeHover(closestEdge);
    } else {
      onEdgeHover(null);
    }
  };

  const handleClick = () => {
    if (hoveredEdge && onEdgeClick) {
      onEdgeClick(hoveredEdge);
    }
  };

  if (!geometry) {
    return null;
  }

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
      >
        <meshStandardMaterial
          color="#888888"
          side={THREE.DoubleSide}
          flatShading
        />
      </mesh>

      {/* Regular edges */}
      {edgesGeometry && (
        <lineSegments geometry={edgesGeometry}>
          <lineBasicMaterial color="#333333" linewidth={1} />
        </lineSegments>
      )}

      {/* Seam edges */}
      {edgeLines?.map(({ start, end, key }) => {
        const isSeam = seamEdges.has(key);
        const isHovered = key === hoveredEdge;

        if (!isSeam && !isHovered) return null;

        const points = [start, end];

        return (
          <Line
            key={key}
            points={points}
            color={isSeam ? '#ff0000' : '#ffff00'}
            lineWidth={isHovered ? 3 : 2}
          />
        );
      })}
    </group>
  );
}

function CameraSetup({ geometry }: { geometry: THREE.BufferGeometry | null }) {
  const { camera } = useThree();

  useEffect(() => {
    if (geometry) {
      geometry.computeBoundingBox();
      const bbox = geometry.boundingBox;

      if (bbox) {
        const center = new THREE.Vector3();
        bbox.getCenter(center);

        const size = new THREE.Vector3();
        bbox.getSize(size);

        const maxDim = Math.max(size.x, size.y, size.z);
        const distance = maxDim * 2;

        camera.position.set(
          center.x + distance,
          center.y + distance * 0.5,
          center.z + distance
        );
        camera.lookAt(center);
        camera.updateProjectionMatrix();
      }
    }
  }, [geometry, camera]);

  return null;
}

export default function MeshViewer(props: MeshViewerProps) {
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        <CameraSetup geometry={props.geometry} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />

        <MeshObject {...props} />

        <OrbitControls makeDefault />
        <Grid args={[10, 10]} />
      </Canvas>
    </div>
  );
}
