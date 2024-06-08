import { useEffect, useState } from "react";
import { fetchImages } from "./../../images-api";
import { ImgProps, Response } from "../../types";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";


export default function App() {
  const [images, setImages] = useState<ImgProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const modImg = images.find((img) => img.id === selectedImage)?.urls.regular;
  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getImages(): Promise<void> {
      try {
        setError(false);
        setIsLoading(true);
        const {result}: Response = await fetchImages(query, page);
      
        setImages((prevImages) => {
          return [...prevImages, ...result];
        });
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  const handleOpenModal = (): void => {
    setOpenModal(true);
  }

  const handleImageId = (id: number): void => {
    setSelectedImage(id);
  }; 

  const closeModal = (): void => {
    setOpenModal(false);
    setSelectedImage(null);
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}

      {images.length > 0 && <ImageGallery data={images} onClick={handleOpenModal} onId={handleImageId} />}

      {isLoading && <Loader />}

      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        id={modImg}
        openModal={openModal}
        CloseModal={closeModal}
      />
    </>
  );
}
