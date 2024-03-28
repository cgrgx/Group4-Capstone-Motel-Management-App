import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/room-images/`;

export const dataRooms = [
  {
    name: "Cozy Nook",
    bed_type: "Single Room",
    max_capacity: 1,
    regular_price: 45,
    discount_price: null,
    image: imageUrl + "room-1.jpg",
    description:
      "Cozy room with a comfortable twin bed, a nightstand with a lamp, and a window with sheer curtains.",
  },
  {
    name: "Double Haven",
    bed_type: "Double Room",
    max_capacity: 2,
    regular_price: 65,
    discount_price: null,
    image: imageUrl + "room-2.jpg",
    description:
      "Standard room with two comfortable queen beds, separated by a nightstand with a lamp. Includes a simple desk with a chair and a window with blinds.",
  },
  {
    name: "Queen's Retreat",
    bed_type: "Queen Suite",
    max_capacity: 2,
    regular_price: 85,
    discount_price: 5,
    image: imageUrl + "room-3.jpg",
    description:
      "Spacious suite featuring a large, plush queen bed, a dresser with a TV mounted on top, and a seating area with a comfy armchair and a small coffee table.",
  },
  {
    name: "King's Paradise",
    bed_type: "King Suite",
    max_capacity: 2,
    regular_price: 105,
    discount_price: 10,
    image: imageUrl + "room-4.jpg",
    description:
      "Luxurious suite with a king-size bed with a plush headboard, two bedside tables with lamps, and a doorway leading to a bathroom. A seating area with a love seat and a coffee table sits beneath a window with elegant drapes.",
  },
  {
    name: "Studio Loft",
    bed_type: "Studio Room",
    max_capacity: 2,
    regular_price: 95,
    discount_price: 5,
    image: imageUrl + "room-5.jpg",
    description:
      "Modern open-concept room featuring a comfy king bed tucked into a corner, a kitchenette with a mini-fridge, microwave, and sink, and a seating area with a sofa and a coffee table beneath a window with blinds.",
  },
];
