import React,{useEffect, useState} from 'react'
import Header from "../components/header"
import Table from "../components/table"
import {allList, deleteCar} from "./api/endpoint"
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {

  const [data, setData] = useState([])
  const [update, setUpdate] = useState(false)

  const fetchList = async()=>{
    try{
      const res = await allList();
      setData(res);
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchList();
  },[update])

  const handleDelete = async(id)=>{
    try{
      await deleteCar(id);
      toast.success("Car successfully deleted")
      setUpdate((prev)=>!prev)
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <>
    <Toaster/>
    <Header/>
    <Table data={data} handleDelete={handleDelete}/>
    </>
  )
}

export default Home