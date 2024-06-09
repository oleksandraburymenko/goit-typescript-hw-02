import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import React, { FC } from 'react';
import { ImgProps, ImageGalleryProps } from "../../types";

const ImageGallery: FC<ImageGalleryProps> = ({ data, onClick, onId }) => {
  return (
    <ul className={css.gallery }>
      {data.map((item: ImgProps) => {
        return (
          <li key={item.id} className={css.item}>
            <ImageCard 
            data={item}  onClick={onClick} onId={onId}/>
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery;