export interface ImgProps{
    id: number;
    urls:{
      regular: string;
      small: string;
    }
      src: string;
      alt_description: string;
}
    
export interface ImageCardProps { 
  data:ImgProps;
  onClick: () => void ;
  onId: (id: number) => void;
}
  
  
export interface ImageModalProps{
    openModal: boolean;
    CloseModal: () => void;
    id: string | undefined;
}
  
export interface ImageGalleryProps {
    data: ImgProps[];
    onClick: () => void;
    onId: (id: number) => void;
}
  
export interface Response {
    result: ImgProps[];
    total: number;
}
  
export interface SearchBarProps{
    onSearch: (newQuery:string)=>void;
}