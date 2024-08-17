import { TbBeach, TbHome, TbIroning3 } from "react-icons/tb";
import {
  MdOutlineVilla,
  MdCabin,
  MdOutlineForest,
  MdMicrowave,
  MdBalcony,
  MdYard,
  MdPets,
} from "react-icons/md";
import {
  GiIsland,
  GiFamilyHouse,
  GiFlood,
  GiTreehouse,
  GiCaveEntrance,
  GiPalmTree,
  GiHeatHaze,
  GiCctvCamera,
  GiToaster,
  GiBarbecue,
  GiCampfire,
} from "react-icons/gi";
import {
  PiTentBold,
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { IoBedOutline } from "react-icons/io5";
import {
  FaSwimmingPool,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
  FaHouseUser,
} from "react-icons/fa";
import { FaKitchenSet, FaPeopleRoof } from "react-icons/fa6";
import { IoEarth } from "react-icons/io5";
import { BsPersonWorkspace, BsSnow, BsFillDoorOpenFill } from "react-icons/bs";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
} from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    name: "All",
    icon: IoEarth,
  },
  {
    name: "Beachfront",
    icon: TbBeach,
  },
  {
    name: "Design",
    icon: MdOutlineVilla,
  },
  {
    name: "Islands",
    icon: GiIsland,
  },
  {
    name: "Cabins",
    icon: MdCabin,
  },
  {
    name: "Camping",
    icon: PiTentBold,
  },
  {
    name: "Mainsions",
    icon: GiFamilyHouse,
  },
  {
    name: "Lakefront",
    icon: GiFlood,
  },
  {
    name: "Treehouses",
    icon: GiTreehouse,
  },
  {
    name: "Tropical",
    icon: GiPalmTree,
  },
  {
    name: "Caves",
    icon: GiCaveEntrance,
  },
  {
    name: "Forest",
    icon: MdOutlineForest,
  },
  {
    name: "Rooms",
    icon: IoBedOutline,
  },
  {
    name: "Tiny homes",
    icon: TbHome,
  },
  {
    name: "Amazing pool",
    icon: FaSwimmingPool,
  },
];

export const amenities = [
  {
    name: "Bath tub",
    icon: PiBathtubFill,
  },
  {
    name: "Personal care products",
    icon: FaPumpSoap,
  },
  {
    name: "Outdoor shower",
    icon: FaShower,
  },
  {
    name: "Washer",
    icon: BiSolidWasher,
  },
  {
    name: "Dryer",
    icon: BiSolidDryer,
  },
  {
    name: "Hangers",
    icon: PiCoatHangerFill,
  },
  {
    name: "Iron",
    icon: TbIroning3,
  },
  {
    name: "TV",
    icon: PiTelevisionFill,
  },
  {
    name: "Dedicated workspace",
    icon: BsPersonWorkspace,
  },
  {
    name: "Air Conditioning",
    icon: BsSnow,
  },
  {
    name: "Heating",
    icon: GiHeatHaze,
  },
  {
    name: "Security cameras",
    icon: GiCctvCamera,
  },
  {
    name: "Fire extinguisher",
    icon: FaFireExtinguisher,
  },
  {
    name: "First Aid",
    icon: BiSolidFirstAid,
  },
  {
    name: "Wifi",
    icon: BiWifi,
  },
  {
    name: "Cooking set",
    icon: FaKitchenSet,
  },
  {
    name: "Refrigerator",
    icon: BiSolidFridge,
  },
  {
    name: "Microwave",
    icon: MdMicrowave,
  },
  {
    name: "Stove",
    icon: GiToaster,
  },
  {
    name: "Barbecue grill",
    icon: GiBarbecue,
  },
  {
    name: "Outdoor dining area",
    icon: FaUmbrellaBeach,
  },
  {
    name: "Private patio or Balcony",
    icon: MdBalcony,
  },
  {
    name: "Camp fire",
    icon: GiCampfire,
  },
  {
    name: "Garden",
    icon: MdYard,
  },
  {
    name: "Free parking",
    icon: AiFillCar,
  },
  {
    name: "Self check-in",
    icon: FaKey,
  },
  {
    name: " Pet allowed",
    icon: MdPets,
  },
];

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: FaHouseUser,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: BsFillDoorOpenFill,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: FaPeopleRoof,
  },
];
