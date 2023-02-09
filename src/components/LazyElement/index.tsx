import React from "react";
import { LoadingScreen } from "@/components";

interface LazyElementProps{
  cb:()=>any
} 
function LazyElement({cb}:LazyElementProps){

  const Component=React.lazy(cb)

  return <React.Suspense fallback={<LoadingScreen/>}>
    <Component/>
  </React.Suspense>
}

export default LazyElement;