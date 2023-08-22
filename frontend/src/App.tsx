import React, { useEffect, useState } from 'react';
import './App.css';
import { isEqual } from 'lodash';
import ImageViewer from './components/ImageViewer';
import Navigation from './components/Navigation';
import { Tag } from './types';


const url = "http://localhost:8000/images";

function App() {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState<Tag[][]>([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (tags.length === 0) {
      fetch(url).then((response) => response.json()).then((data) => {
        setImages(data.map((img: { file_stem: string }) => img.file_stem));
        for (let i = 0; i < data.length; i++) {
          tags.push([]);
        }
      });
    }
  }, []);

  const addTag = (tag: Tag) => {
    const newTagsForImage: Tag[] = [...tags[currentImage], tag];
    const newTags: Tag[][] = tags.map((tag, i) => i === currentImage ? newTagsForImage : tag)
    setTags(newTags);
  }

  const deleteTag = (tag: Tag) => {
    const newTagsForImage: Tag[] = tags[currentImage].filter(t => !isEqual(t, tag));
    const newTags: Tag[][] = tags.map((tag, i) => i === currentImage ? newTagsForImage : tag);
    setTags(newTags);
  }

  return (
    <div className="App">
      {images.length > 0 &&
        <>
          <ImageViewer src={`${url}/${images[currentImage]}`} tags={tags![currentImage]} addTag={addTag} deleteTag={deleteTag} />
          <br />
          <Navigation index={currentImage} setIndex={setCurrentImage} totalItems={images.length} />
        </>
      }
    </div>
  );
}

export default App;
