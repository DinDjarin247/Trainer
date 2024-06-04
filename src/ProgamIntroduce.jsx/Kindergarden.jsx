import img1 from "@/assets/kinder01.png";
import img2 from "@/assets/kinder02.png";
// draw
import drawing1 from "@/assets/kinderImg/drawing/draw1.jpg";
import drawing2 from "@/assets/kinderImg/drawing/draw2.jpg";
import drawing3 from "@/assets/kinderImg/drawing/draw3.jpg";
import drawing4 from "@/assets/kinderImg/drawing/draw4.jpg";
import drawing5 from "@/assets/kinderImg/drawing/draw5.jpg";
import drawing6 from "@/assets/kinderImg/drawing/draw6.jpg";
//mark
import mark1 from "@/assets/kinderImg/mark/mark1.jpg";
import mark2 from "@/assets/kinderImg/mark/mark2.jpg";
import mark3 from "@/assets/kinderImg/mark/mark3.jpg";
import mark4 from "@/assets/kinderImg/mark/mark4.jpg";
import mark5 from "@/assets/kinderImg/mark/mark5.jpg";
//print
import print1 from "@/assets/kinderImg/print/print1.jpg";
import print2 from "@/assets/kinderImg/print/print2.jpg";
import print3 from "@/assets/kinderImg/print/print3.jpg";
import print4 from "@/assets/kinderImg/print/print4.jpg";
//stick
import stick1 from "@/assets/kinderImg/stick/stick1.jpg";
import stick2 from "@/assets/kinderImg/stick/stick2.jpg";
import stick3 from "@/assets/kinderImg/stick/stick3.jpg";
import stick4 from "@/assets/kinderImg/stick/stick4.jpg";
import stick5 from "@/assets/kinderImg/stick/stick5.jpg";
import stick6 from "@/assets/kinderImg/stick/stick6.jpg";
//rest
import rest1 from "@/assets/kinderImg/rest/rest1.jpg";
import rest2 from "@/assets/kinderImg/rest/rest2.jpg";
import rest3 from "@/assets/kinderImg/rest/rest3.jpg";
import rest4 from "@/assets/kinderImg/rest/rest4.jpg";
import rest5 from "@/assets/kinderImg/rest/rest5.jpg";
//step1
import aaa from "@/assets/stepImg/step1/1/1-1-1.jpg";
import aab from "@/assets/stepImg/step1/1/1-1-2.jpg";
import aac from "@/assets/stepImg/step1/1/1-1-3.jpg";
import aad from "@/assets/stepImg/step1/1/1-1-4.jpg";
import aae from "@/assets/stepImg/step1/1/1-1-5.jpg";
import aaf from "@/assets/stepImg/step1/1/1-1-6.jpg";
import aag from "@/assets/stepImg/step1/1/1-1-7.jpg";
import aah from "@/assets/stepImg/step1/1/1-1-8.jpg";

import aba from "@/assets/stepImg/step1/2/1-2 (1).jpg";
import abb from "@/assets/stepImg/step1/2/1-2 (2).jpg";
import abc from "@/assets/stepImg/step1/2/1-2 (3).jpg";
import abd from "@/assets/stepImg/step1/2/1-2 (4).jpg";
import abe from "@/assets/stepImg/step1/2/1-2 (5).jpg";

import aca from "@/assets/stepImg/step1/3/1-3 (1).jpg";
import acb from "@/assets/stepImg/step1/3/1-3 (2).jpg";
import acc from "@/assets/stepImg/step1/3/1-3 (3).jpg";
import acd from "@/assets/stepImg/step1/3/1-3 (4).jpg";
import ace from "@/assets/stepImg/step1/3/1-3 (5).jpg";
import acf from "@/assets/stepImg/step1/3/1-3 (6).jpg";
import acg from "@/assets/stepImg/step1/3/1-3 (7).jpg";
import ach from "@/assets/stepImg/step1/3/1-3 (8).jpg";
import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";

const Kindergarden = () => {
  const [layout, setLayout] = React.useState(undefined);
  const [images, setImages] = React.useState([]);
  const [openDropdown, setOpenDropdown] = React.useState({});

  const drawingImages = [
    drawing1,
    drawing2,
    drawing3,
    drawing4,
    drawing5,
    drawing6,
  ];
  const markImages = [mark1, mark2, mark3, mark4, mark5];
  const printImages = [print1, print2, print3, print4];
  const stickImages = [stick1, stick2, stick3, stick4, stick5, stick6];
  const restImages = [rest1, rest2, rest3, rest4, rest5];
  const step1_1 = [aaa, aab, aac, aad, aae, aaf, aag, aah];
  const step1_2 = [aba, abb, abc, abd, abe];
  const step1_3 = [aca, acb, acc, acd, ace, acf, acg, ach];

  const handleButtonClick = (imageSet) => {
    setImages(imageSet);
    setLayout("fullscreen");
  };

  const handleOpenChange = (dropdownName, isOpen) => {
    setOpenDropdown((prevState) => ({ ...prevState, [dropdownName]: isOpen }));
  };

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={img1} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">예시 작품</h2>
          <p>아이들이 그린 그림들</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => handleButtonClick(drawingImages)}
            >
              그리기
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleButtonClick(stickImages)}
            >
              붙이기 활동
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleButtonClick(markImages)}
            >
              흔적 남기기
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleButtonClick(printImages)}
            >
              위대한 인쇄물
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleButtonClick(restImages)}
            >
              기타
            </button>
          </div>
        </div>
      </div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={img2} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">예시 작품</h2>
          <p>아이들이 그린 그림들</p>
          <div className="card-actions justify-end">
            <Dropdown
              open={!!openDropdown.step1}
              onOpenChange={(event, isOpen) =>
                handleOpenChange("step1", isOpen)
              }
            >
              <MenuButton>STEP1</MenuButton>
              <Menu>
                <MenuItem onClick={() => handleButtonClick(step1_1)}>
                  STEP1-1
                </MenuItem>
                <MenuItem onClick={() => handleButtonClick(step1_2)}>
                  STEP1-2
                </MenuItem>
                <MenuItem onClick={() => handleButtonClick(step1_3)}>
                  STEP1-3
                </MenuItem>
              </Menu>
            </Dropdown>
            <Dropdown
              open={!!openDropdown.step2}
              onOpenChange={(event, isOpen) =>
                handleOpenChange("step2", isOpen)
              }
            >
              <MenuButton>STEP2</MenuButton>
              <Menu>
                <MenuItem>STEP2-1</MenuItem>
                <MenuItem>STEP2-2</MenuItem>
                <MenuItem>STEP2-3</MenuItem>
              </Menu>
            </Dropdown>
            <Dropdown
              open={!!openDropdown.step3}
              onOpenChange={(event, isOpen) =>
                handleOpenChange("step3", isOpen)
              }
            >
              <MenuButton>STEP3</MenuButton>
              <Menu>
                <MenuItem>STEP3-1</MenuItem>
                <MenuItem>STEP3-2</MenuItem>
                <MenuItem>STEP3-3</MenuItem>
              </Menu>
            </Dropdown>
            <Dropdown
              open={!!openDropdown.step4}
              onOpenChange={(event, isOpen) =>
                handleOpenChange("step4", isOpen)
              }
            >
              <MenuButton>STEP4</MenuButton>
              <Menu>
                <MenuItem>STEP4-1</MenuItem>
                <MenuItem>STEP4-2</MenuItem>
                <MenuItem>STEP4-3</MenuItem>
              </Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* 모달 정리 */}
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog layout={layout}>
          <ModalClose />
          <DialogTitle>아이들 작품 예시</DialogTitle>
          <DialogContent>
            <h3 className="font-bold text-lg">아이들 작품 예시</h3>
            <div>
              {images.map((image, index) => (
                <div key={index} className="carousel-item w-full">
                  <img
                    src={image}
                    className="w-full"
                    alt={`Carousel item ${index}`}
                  />
                </div>
              ))}
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Kindergarden;
