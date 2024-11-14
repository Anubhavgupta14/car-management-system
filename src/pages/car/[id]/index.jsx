import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "swiper/css";
import Swiper from "../../../components/swiper";
import { getCar } from "../../api/endpoint";
import Header from "@/components/header";
import { FaArrowLeft } from "react-icons/fa6";

const CarViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);

  const fetchCar = async () => {
    setLoading(true);
    try {
      const response = await getCar(id);
      setCar(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  if (loading || !car) return "Loading...";

  return (
    <div style={{ position: "relative" }}>
      <Header />
      <button
        className="back-btn"
        onClick={() => {
          router.push("/");
        }}
      >
        <FaArrowLeft />
        Back
      </button>
      <div className="max-w-4xl mx-auto py-8">
        <Swiper images={car.images} />

        <h1 className="text-3xl font-bold my-4">{car.title}</h1>
        <p className="mb-4">{car.description}</p>

        <div className="flex flex-wrap gap-2">
          {car.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarViewPage;
