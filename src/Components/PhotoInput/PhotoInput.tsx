import React from "react";
import styled from "src/typed-components";

const Container = styled.div``;

const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;

const Image = styled.label`
  cursor: pointer;
  height: 150px;
  width: 150px;
  border: 1px solid grey;
  margin-left: 40px;
  display: block;
  border-radius: 50%;
  margin-bottom: 35px;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 150px;
    height: 150px;
  }
`;

interface IProps {
  uploading: boolean;
  fileUrl: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoInput: React.SFC<IProps> = ({ uploading, fileUrl, onChange }) => (
  <Container>
    <Input id={"photo"} type="file" accept="image/*" onChange={onChange} />
    <Image htmlFor="photo">
      {uploading && "⏰"}
      {!uploading && <img src={fileUrl} />}
    </Image>
  </Container>
);

export default PhotoInput;
