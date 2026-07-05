export type CreativeModel = {
  title: string;
  description: string;
  previewImage: string;
  modelSrc?: string;
  alt: string;
};

export const creativeFocus = [
  "Blender Sculptures",
  "3D Objects",
  "Image & Video Editing",
  "Games",
  "Physics",
  "Philosophy",
  "Mathematics",
  "Robotics"
];

export const hobbies = [
  "Coding",
  "Digital sculpting",
  "Basketball",
  "Image and video editing",
  "Reading books",
  "Solving NP-hard problems",
  "Investing",
  "Physics",
  "Philosophy",
  "Mathematics",
  "Running",
  "Robotics",
  "Designing 3D objects"
];

export const modelGallery: CreativeModel[] = [
  {
    title: "Digital Sculpture Slot",
    description:
      "Placeholder for a Blender sculpture exported as GLB or GLTF.",
    previewImage: "/images/hero-systems.png",
    alt: "Placeholder preview for a digital sculpture"
  },
  {
    title: "Mechanical Object Slot",
    description:
      "Placeholder for a 3D object that demonstrates spatial and mechanical thinking.",
    previewImage: "/images/hero-systems.png",
    alt: "Placeholder preview for a mechanical 3D object"
  },
  {
    title: "Experimental Scene Slot",
    description:
      "Placeholder for an experimental model, environment, or creative technology study.",
    previewImage: "/images/hero-systems.png",
    alt: "Placeholder preview for an experimental 3D scene"
  }
];
