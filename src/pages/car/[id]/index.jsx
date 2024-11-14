import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getCar } from "../../api/endpoint";
import { useRouter } from "next/router";
import Header from "@/components/header";

const CarViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, Setloading] = useState(false)

  console.log(id)
  const [car, setCar] = useState({});

  const fetchCar = async()=>{
    Setloading(true)
    try{
        const res = await getCar(id);
        console.log(res)
        if(res){
            setCar(res)
        }
    }
    catch(err){
        console.log(err)    
    }
    finally{
        Setloading(false)
    }
  }

  useEffect(()=>{
    fetchCar();
  },[id])

  if(loading) return "Loading..."
  return (
    <>
    <Header/>
    <div className="max-w-4xl mx-auto py-8">
      <Carousel>
        {car && car?.images?.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Car Image ${index}`} />
          </div>
        ))}
      </Carousel>

      <h1 className="text-3xl font-bold my-4">{car.title}</h1>
      <p className="text-gray-600 mb-4">{car.description}</p>

      <div className="flex flex-wrap gap-2">
        {car && car?.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    </>
  );
};

export default CarViewPage;
