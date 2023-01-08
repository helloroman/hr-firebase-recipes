import React, {useEffect, useState} from 'react';
import './Posts.styles.scss';
import {ArrowCircleUp} from "@mui/icons-material";
import { uploadBytes, ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from "../main.jsx";

export const Posts = () => {
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    (async () => {
      const imagesListRef = await listAll(ref(storage, `images/`));
      const imagesList = await imagesListRef.items.reduce(async (acc, item) => {
        const urlList = await acc;
        const url = await getDownloadURL(item);
        urlList.push(url);
        return urlList;
      }, Promise.resolve([]));
      console.log(imagesList);
      setGallery(prev => [...prev, ...imagesList]);
    })();
  }, []);

  const handleSelectImage = (e) => {
    setImage(e.target.files[0]);
  }

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      const imageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      setGallery(prev => [...prev, url]);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="posts">
      <form className="posts__form form" onSubmit={handleUploadImage}>
        <h2>Send something cool!</h2>
        <label className="form__label" htmlFor="file"><ArrowCircleUp /> Upload photo</label>
        <input className="form__input" type="file" name="file" id="file" onChange={handleSelectImage} />
        <button className="form__button" type="submit" disabled={!image}>Submit</button>
      </form>
      <div className="content">
        {gallery.map(imageSrc => <img src={imageSrc} key={imageSrc.substring(imageSrc.length - 10)} alt=""/>)}
      </div>
    </div>
  )
};