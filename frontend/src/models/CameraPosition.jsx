// src/components/CameraPositions.js
import { Vector3, Euler } from 'three';

const CameraPosition = [
  {
    position: new Vector3(7.61, -0.70, 1.13),
    rotation: new Euler(0, 90 * (Math.PI / 180), 0)
  },
  {
    position: new Vector3(-30.01, -9.16, 1.39),
    rotation: new Euler(-19.02 * (Math.PI / 180), -0.81 * (Math.PI / 180), -0.28 * (Math.PI / 180))
  },
  {
    position: new Vector3(-50.03, -8.97, -6.13),
    rotation: new Euler(-102.37 * (Math.PI / 180), 85.84 * (Math.PI / 180), 102.40 * (Math.PI / 180))
  },
  {
    position: new Vector3(-31.60, -7.29, -10.09),
    rotation: new Euler(-5.98 * (Math.PI / 180), -0.23 * (Math.PI / 180), -0.02 * (Math.PI / 180))
  },
  {
    position: new Vector3(-44.44, 3.48, -11.88),
    rotation: new Euler(-0.41 * (Math.PI / 180), 0.33 * (Math.PI / 180), 0.00 * (Math.PI / 180))
  },
  {
    position: new Vector3(-25.86, 4.65, -10.45),
    rotation: new Euler(-22.51 * (Math.PI / 180), 0.22 * (Math.PI / 180), 0.09 * (Math.PI / 180))
  },
  {
    position: new Vector3(-34.69, 4.19, 11.97),
    rotation: new Euler(-163.83 * (Math.PI / 180), 0.14 * (Math.PI / 180), 179.96 * (Math.PI / 180))
  }
];

export default CameraPosition;
