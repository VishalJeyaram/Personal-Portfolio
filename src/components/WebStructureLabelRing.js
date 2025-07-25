import React from 'react';
import { Text } from '@react-three/drei';
import { identity } from '../data/personal_info';

export default function WebStructureLabelRing() {
  const topName = identity.topName
  const bottomName = identity.bottomName;

  const topRadius = 1.80; 
  const bottomRadius = 1.80; 

  const topLetters = topName.split('').map((char, i) => {
    const angle = Math.PI - (Math.PI / (topName.length - 1)) * i; 
    const x = topRadius * Math.cos(angle);
    const y = topRadius * Math.sin(angle);
    return (
      <Text
        key={`top-${i}`}
        position={[x, y + 0.15, 0]}
        rotation={[0, 0, angle - Math.PI / 2]} // inverted to face inward along arc
        fontSize={0.4}
        font="/fonts/Orbitron-VariableFont_wght.ttf"
        color="#ffffff"
        strokeColor="#00ffff"
        strokeWidth={0.03}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {char}
      </Text>
    );
  });

  const bottomLetters = bottomName.split('').map((char, i) => {
    const angle = (Math.PI / (bottomName.length - 1)) * i + Math.PI; // start from left and go downwards
    const x = bottomRadius * Math.cos(angle);
    const y = bottomRadius * Math.sin(angle);
    return (
      <Text
        key={`bottom-${i}`}
        position={[x, y - 0.15, 0]}
        rotation={[0, 0, angle + Math.PI / 2]}
        fontSize={0.4}
        font="/fonts/Orbitron-VariableFont_wght.ttf"
        color="#ffffff"
        strokeColor="#00ffff"
        strokeWidth={0.03}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {char}
      </Text>
    );
  });

  return <group>{topLetters}{bottomLetters}</group>;
}
