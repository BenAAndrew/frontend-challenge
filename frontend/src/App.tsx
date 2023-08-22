import React, { useEffect, useState } from 'react';
import './App.css';
import ImageViewer from './components/ImageViewer';


const url = "http://localhost:8000/images";

function App() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetch(url).then((response) => response.json()).then((data) => setImages(data.map((img: { file_stem: string }) => img.file_stem)));
  }, []);

  return (
    <div className="App">
      <ImageViewer src={`${url}/${images[currentImage]}`} />
    </div>
  );
}

export default App;
