// All copy and scene data lives here so components stay presentational.
// Every figure is an illustrative value for a fictional concept brand.

export const NAV_LINKS = [
  { label: 'Performance', id: 'performance' },
  { label: 'Design', id: 'design' },
  { label: 'Technology', id: 'technology' },
]

export const STATS = [
  { value: 98, decimals: 0, suffix: '%', label: 'Engineering precision' },
  { value: 2.8, decimals: 1, suffix: 's', label: '0–100 km/h' },
  { value: 720, decimals: 0, suffix: ' km', label: 'Estimated range' },
]

/**
 * Callouts pinned to the car photograph.
 *  at   - position on the photo, 0-1 from top-left of the image frame
 *  dir  - direction the leader line runs from the dot
 *  len  - leader length in px at scale 1 (the frame scales with the car)
 *  phase - which scene caption it belongs to
 */
export const CALLOUTS = [
  { id: 'intake', phase: 'front', at: [0.285, 0.625], dir: 'down', len: 64, title: 'Active intake', text: 'Opens only when the motors need air.' },
  { id: 'brakes', phase: 'front', at: [0.535, 0.56], dir: 'right', len: 74, title: 'Carbon-ceramic brakes', text: 'Fade-free from 300 km/h.' },
  { id: 'mirror', phase: 'rear', at: [0.675, 0.35], dir: 'up', len: 68, title: 'Blade mirror', text: 'Cuts turbulence along the door line.' },
  { id: 'wheel', phase: 'rear', at: [0.915, 0.5], dir: 'left', len: 70, title: 'Forged wheels', text: 'Hollow spokes, 14 kg lighter per axle.' },
]

export const PHASES = {
  front: {
    title: 'Front axle',
    text: 'Air is managed before it reaches the car. Every opening is there because the motors, brakes or battery asked for it.',
  },
  rear: {
    title: 'Rear haunch',
    text: 'The shoulder carries the airflow all the way to the tail, so the car stays planted when the road stops being straight.',
  },
}

export const HIGHLIGHTS = [
  { figure: '4', unit: 'motors', text: 'Torque is set at each wheel independently and adjusted continuously through a corner.' },
  { figure: '800', unit: 'V', text: 'A high-voltage architecture that recharges from 10 to 80 percent in about 18 minutes.' },
  { figure: '0.21', unit: 'Cd', text: 'A drag figure tuned in the wind tunnel, which is where the range comes from.' },
]

export const DESIGN_NOTES = [
  { id: 'vents', at: [0.36, 0.23], dir: 'up', len: 52, title: 'Louvred bonnet', text: 'Vents heat from the motors.' },
  { id: 'light', at: [0.69, 0.3], dir: 'up', len: 72, title: 'Light signature', text: 'One continuous blade.' },
  { id: 'lower', at: [0.5, 0.64], dir: 'down', len: 56, title: 'Lower intake', text: 'Feeds the brake ducts.' },
]
