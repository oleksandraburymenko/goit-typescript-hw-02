import css from "./LoadMoreBtn/LoadMoreBtn.module.css";
import React, { FC } from 'react';
interface LoadMoreBtnProps {
    onClick: () => void;
}

const LoadMoreBtn:FC<LoadMoreBtnProps> = ({onClick}) => {
  return (<>
    <button 
    onClick={onClick} 
    className={css.button }>
    Load more
    </button>
    </>)
}

export default LoadMoreBtn;