import { useEffect, useState } from "react";
import { fetchImages } from "./../../images-api";
import { ImgProps, Response } from "../../types";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";
import SearchBar from "./SearchBar/SearchBar.jsx";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMessage from "./ErrorMessage/ErrorMessage.jsx";
import Loader from "./Loader/Loader.jsx";
import ImageModal from "./ImageModal/ImageModal.jsx";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(28, 28, 28, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "",
  },
};


export default function App() {
  const [images, setImages] = useState<ImgProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
      setTotal(0);
      return;
    }

    async function getImages(): Promise<void> {
      try {
        setError(false);
        setIsLoading(true);
        const {result, total}: Response = await fetchImages(query, page);
        setTotal(total);
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

  const openModal = (): void => {
    setIsOpen(true);
  }

  const handleImageId = (id: number): void => {
    setSelectedImage(id);
  }; 

  const closeModal = (): void => {
    setIsOpen(false);
    setSelectedImage(null);
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}

      {images.length > 0 && <ImageGallery items={images} onOpen={openModal} onId={handleImageId} />}

      {isLoading && <Loader />}

      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        imageUrl={selectedImage}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      />
    </>
  );
}
