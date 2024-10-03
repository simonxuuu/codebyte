"use client"
import { useEffect } from "react";
import { Gradient } from "whatamesh";

export default function GradientBlogBackground() {

   useEffect(()=>{const gradient = new Gradient();gradient.initGradient("#gradient-canvas-blog");},[])
    
    
    
    
    
    
    return (
      
        <canvas id='gradient-canvas-blog'></canvas>
        
    );
  }