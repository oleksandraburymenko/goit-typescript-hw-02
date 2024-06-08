import css from "./ImageCard.module.css"
import React, { FC } from 'react';
import { ImageCardProps } from "../../types";


const ImageCard: FC<ImageCardProps> = ({data: { id, alt_description, urls: { small } }, onClick, onId}) => {
    return (
        <div className={css.thumb}>
          <img  
          key={id} 
          src={small} 
          alt={alt_description}  
          className={css.image } 
          onClick={() => {
            onClick();
            onId(id)
        }}/>
        </div>
    );
};

export default ImageCard;