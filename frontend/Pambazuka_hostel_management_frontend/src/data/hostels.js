import greenViewCover from "../assets/images/green-view/cover.jpg";
import unityResidenceCover from "../assets/images/unity-residence/cover.jpg";
import sunriseHostelCover from "../assets/images/sunrise-hostel/cover.jpg";
import eliteStudentHomesCover from "../assets/images/elite-student-homes/cover.jpg";
import campusEdgeCover from "../assets/images/campus-edge/cover.jpg";
import royalGardensCover from "../assets/images/royal-gardens/cover.jpg";
import hillsideResidenceCover from "../assets/images/hillside-residence/cover.jpg";
import greenViewBathrooms from "../assets/images/green-view/bathrooms.jpg";
import sunriseHostelsBathrooms from "../assets/images/sunrise-hostel/bathrooms.jpg";
import sunriseHostelsKitchen from "../assets/images/sunrise-hostel/kitchen-space.jpg";
import sunriseHostelsExteriorWithParking from "../assets/images/sunrise-hostel/Exterior-with-parking.jpg";
import sunriseHostelLaundryArea from "../assets/images/sunrise-hostel/laundry-area.jpg";
import greenViewKitchenSpace from "../assets/images/green-view/kitchen-space.jpg";
import greenViewExteriorWithParking from "../assets/images/green-view/Exterior-with-parking.jpg";
import greenViewLaundryArea from "../assets/images/green-view/laundry-area.jpg";
import hillsideResidenceBathrooms from "../assets/images/hillside-residence/bathrooms.jpg";
import hillsideResidenceKitchenSpace from "../assets/images/hillside-residence/kitchen-space.jpg";
import hillsideResidenceExteriorWithParking from "../assets/images/hillside-residence/Exterior-with-parking.jpg";
import hillsideResidenceLaundryArea from "../assets/images/hillside-residence/laundry-area.jpg";
import royalGardensBathrooms from "../assets/images/royal-gardens/bathrooms.jpg";
import royalGardensKitchenSpace from "../assets/images/royal-gardens/kitchen-space.jpg";
import royalGardensExteriorWithParking from "../assets/images/royal-gardens/Exterior-with-parking.jpg";
import royalGardensLaundryArea from "../assets/images/royal-gardens/laundry-area.jpg";
import campusEdgeBathrooms from "../assets/images/campus-edge/bathrooms.jpg";
import campusEdgeKitchenSpace from "../assets/images/campus-edge/kitchen-space.jpg";
import campusEdgeExteriorWithParking from "../assets/images/campus-edge/Exterior-with-parking.jpg";
import campusEdgeLaundryArea from "../assets/images/campus-edge/laundry-area.jpg";
import eliteStudentHomesBathrooms from "../assets/images/elite-student-homes/bathrooms.jpg";
import eliteStudentHomesKitchenSpace from "../assets/images/elite-student-homes/kitchen-space.jpg";
import eliteStudentHomesExteriorWithParking from "../assets/images/elite-student-homes/Exterior-with-parking.jpg";
import eliteStudentHomesLaundryArea from "../assets/images/elite-student-homes/laundry-area.jpg";
import unityResidenceBathrooms from "../assets/images/unity-residence/bathrooms.jpg";
import unityResidenceKitchenSpace from "../assets/images/unity-residence/kitchen-space.jpg";
import unityResidenceExteriorWithParking from "../assets/images/unity-residence/Exterior-with-parking.jpg";
import unityResidenceLaundryArea from "../assets/images/unity-residence/laundry-area.jpg";

const hostels= [
    {
        id:1,
        name:"Green View Hostel",
        location:"Kesses, Eldoret",
        price:6500,
        gender:"Male",
        rooms:"Shared",
        availability:12,
        distance:"700 meters from Moi University",
        amenities:[
            "Free Wi-Fi",
            "24-Hour Security",
            "Laundry Area",
            "Study Room",
            "Consant Water Supply",
            "Parking Space",

        ],
        description:"Green View Hostel offers a peaceful and secure environmentfor university students.It provides affordable accommodation with modern facilities and shorter distance to Moi University",
        image: {
            cover: greenViewCover,
            exteriorWithParking: greenViewExteriorWithParking,
            bathrooms: greenViewBathrooms,
            kitchenSpace: greenViewKitchenSpace,
            laundryArea: greenViewLaundryArea,
        },
  },

    {
        id:2,
        name:"Unity Student Residence",
        location:"Kapsoya, Eldoret",
        price:7000,
        gender:"Male",
        rooms:"Shared",
        availability:8,
        distance:"1.2 km from University of Eldoret",
        amenities: [
            "Free Wi-Fi",
            "CCTV Surveillance",
            "Reading Room",
            "Laundry Services",
            "Hot Showers",
            "Secure Parking",

        ],
        description:"Unity Student Residence is designed to provide male students with safe and comfortable living environment close to campus and shopping centres",
        image: {
            cover: unityResidenceCover,
            exteriorWithParking: unityResidenceExteriorWithParking,
            bathrooms: unityResidenceBathrooms,
            kitchenSpace: unityResidenceKitchenSpace,
            laundryArea: unityResidenceLaundryArea,
        },
  },


    {
        id:3,
        name:"Sunrise Hostel",
        location:"Annex, Eldoret",
        price:6000,
        gender:"Female",
        rooms:"Shared",
        availability:15,
        distance:"900 meters from Moi University",
        amenities:[
            "Study Area",
            "Free Wi-Fi",
            "24-Hour Security",
            "Water Storage",
            "Kitchen Area",
            "Caretaker Services",
        ],
        description:"Sunrise Hostel provides affordable accomodation for female students with spacious shared rooms and a quiet atmosphere suitable for studying",
        image: {
            cover: sunriseHostelCover,
            exteriorWithParking: sunriseHostelsExteriorWithParking,
            bathrooms: sunriseHostelsBathrooms,
            kitchenSpace: sunriseHostelsKitchen,
            laundryArea: sunriseHostelLaundryArea,
        },
  },
    {
        id:4,
        name:"Elite Student Homes",
        location:"Pioneer, Eldoret",
        price:8000,
        gender:"Female",
        rooms:"Single",
        availability:6,
        distance:"2 km from University of Eldoret",
        amenities:[
            "High-Speeed Internet",
            "Mordern Furniture",
            "Laundry Area",
            "24-Hour Security",
            "Backup Water",
            "Parking",
        ],
        description:"Elite Student Homes offers premium accomodation with modern furniture,spacious rooms and excellent security for students seeking extra comfort.",
        image: {
            cover: eliteStudentHomesCover,
            exteriorWithParking: eliteStudentHomesExteriorWithParking,
            bathrooms: eliteStudentHomesBathrooms,
            kitchenSpace: eliteStudentHomesKitchenSpace,
            laundryArea: eliteStudentHomesLaundryArea,
        },
  },
    {
        id:5,
        name:"Campus Edge Hostels",
        location:"Pioneer,Eldoret",
        price:6800,
        gender:"Male",
        rooms:"Single",
        availability:9,
        distance:"800 meters from Moi University",
        amenities:[
            "Free Wi-fi",
            "24-Hour Security",
            "Laundry Area",
            "Study Space",
            "Constant Water Supply",
            "Parking",
        ],
        description:"Campus Edge Hostels offer convienient accommodation close to campus with spacious single and shared rooms,reliable internet and a secure environment.",
        image: {
            cover: campusEdgeCover,
            exteriorWithParking: campusEdgeExteriorWithParking,
            bathrooms: campusEdgeBathrooms,
            kitchenSpace: campusEdgeKitchenSpace,
            laundryArea: campusEdgeLaundryArea,
        },
    },
    {
        id:6,
        name:"Royal Gardens Hostel",
        location:"Langas, Eldoret",
        price:5500,
        gender:"Male",
        rooms:"Single and Shared",
        availability:18,
        distance:"1.5 km from Moi University",
        amenities:[
            "Free Wi-Fi",
            "Laundry Area",
            "Water Available",
            "Study Lounge",
            "24-Hour security",
            "Common Kitchen",
        ],
        description:"Royal Gardens Hostel is popular among first-year students because of its affordable rent,clean rooms and friendly student community",
        image: {
            cover: royalGardensCover,
            exteriorWithParking: royalGardensExteriorWithParking,
            bathrooms: royalGardensBathrooms,
            kitchenSpace: royalGardensKitchenSpace,
            laundryArea: royalGardensLaundryArea,
        },
    },
    {
        id:7,
        name:"Hillside Student Residence",
        location:"Chepkoilel, Eldoret",
        price:7500,
        gender:"Female",
        rooms:"Single and Shared",
        availability:10,
        distance:"500 meters from Moi University",
        amenities:[
            "Free Wi-Fi",
            "Study Room",
            "24-Hour Security",
            "Laundry Services",
            "Parking",
            "Hot water",
        ],
        description:"Hillside Student Residence provides a quiet and secure environment for female students with comfortable rooms and modern amenities",
        image: {
            cover: hillsideResidenceCover,
            exteriorWithParking: hillsideResidenceExteriorWithParking,
            bathrooms: hillsideResidenceBathrooms,
            kitchenSpace: hillsideResidenceKitchenSpace,
            laundryArea: hillsideResidenceLaundryArea,
        },
    }

];


export const hostelImages = {
    1: {
        cover: greenViewCover,
        exteriorWithParking: greenViewExteriorWithParking,
        bathrooms: greenViewBathrooms,
        kitchenSpace: greenViewKitchenSpace,
        laundryArea: greenViewLaundryArea,
    },
    3: {
        cover: unityResidenceCover,
        exteriorWithParking: unityResidenceExteriorWithParking,
        bathrooms: unityResidenceBathrooms,
        kitchenSpace: unityResidenceKitchenSpace,
        laundryArea: unityResidenceLaundryArea,
    },
    4: {
        cover: sunriseHostelCover,
        exteriorWithParking: sunriseHostelsExteriorWithParking,
        bathrooms: sunriseHostelsBathrooms,
        kitchenSpace: sunriseHostelsKitchen,
        laundryArea: sunriseHostelLaundryArea,
    },
    5: {
        cover: eliteStudentHomesCover,
        exteriorWithParking: eliteStudentHomesExteriorWithParking,
        bathrooms: eliteStudentHomesBathrooms,
        kitchenSpace: eliteStudentHomesKitchenSpace,
        laundryArea: eliteStudentHomesLaundryArea,
    },
    6: {
        cover: campusEdgeCover,
        exteriorWithParking: campusEdgeExteriorWithParking,
        bathrooms: campusEdgeBathrooms,
        kitchenSpace: campusEdgeKitchenSpace,
        laundryArea: campusEdgeLaundryArea,
    },
    7: {
        cover: royalGardensCover,
        exteriorWithParking: royalGardensExteriorWithParking,
        bathrooms: royalGardensBathrooms,
        kitchenSpace: royalGardensKitchenSpace,
        laundryArea: royalGardensLaundryArea,
    },
    8: {
        cover: hillsideResidenceCover,
        exteriorWithParking: hillsideResidenceExteriorWithParking,
        bathrooms: hillsideResidenceBathrooms,
        kitchenSpace: hillsideResidenceKitchenSpace,
        laundryArea: hillsideResidenceLaundryArea,
    },
};

export default hostels;