import React, { useState } from "react";
import { Card, Tag, Modal, Row, Col, Rate, Statistic } from "antd";
import axios from "axios";
import { LikeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector} from 'react-redux';
import {
  getMovieDetail,
  getMovieDetailSuccess,
  getMovieDetailFailure,
} from "./../slices/MovieDetailSlice"

const { Meta } = Card;
const baseUrl = "https://www.omdbapi.com/?";

const MovieCard = (props) => {
  const { movie } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [movieID, setMovieID] = useState();
  //const [movieDetail, setMovieDetail] = useState({});

  const {movieDetail: movieDetails} = useSelector(state => state.movieDetail)
  const dispatch = useDispatch();


  const handleOk = () => setModalVisible(!modalVisible);
  const handleCancel = () => setModalVisible(!modalVisible);

  const description = (
    <>
      <Tag color="magenta">{movie?.Year}</Tag>
      <Tag color="blue">{movie?.Type}</Tag>
    </>
  );

  const fetchMovieDetailById = (id) => {
    dispatch(getMovieDetail())
    return axios
      .get(`${baseUrl}i=${id}&apikey=95172b81`)
      .then((response) => {
       // setMovieDetail(response?.data);
       dispatch(getMovieDetailSuccess(response?.data));
        return response.data;
      })

      .catch((error) => {
        dispatch(getMovieDetailFailure());
        console.log(error, "error");
      });
  };

  const handleMovieClick = (id) => {
    setMovieID(id);
    fetchMovieDetailById(id).then(() => {
      setModalVisible(!modalVisible);
    });
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 240, margin: "20px" }}
        cover={<img alt="example" src={movie?.Poster} />}
        onClick={() => {
          handleMovieClick(movie?.imdbID);
        }}
      >
        <Meta title={movie?.Title} description={description} />
      </Card>

      <Modal
        title={movieDetails?.Title}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ width: "700" }}
        footer ={[null]}

      >
        <Row>
          <Col span={8}>
            <Card cover={<img alt="example" src={movie?.Poster} />}></Card>
          </Col>
          <Col span={16}>
            <div>
              <div style={{ textAlign: "center" }}>
                <strong>Detail Information</strong>
              </div>
              <Row style={{ margin: 20 }}>
                <Col>Rating: </Col>
                <Col>
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={(2, 5)}
                    style={{
                      fontSize: 16,
                      justifyContent: "center",
                      margin: "0, 4px",
                    }}
                  />
                  {movieDetails?.imdbRating}
                </Col>
              </Row>
              <Row style={{ margin: 20 }}>
                <Col>Directors: </Col>
                <Col>
                  <strong>{movieDetails?.Director}</strong>
                </Col>
              </Row>
              <Row style={{ margin: 20 }}>
                <Col>Writer: </Col>
                <Col>
                  <strong>{movieDetails?.Writer}</strong>
                </Col>
              </Row>

              <Row style={{ margin: 20 }}>
                <Col>Cast: </Col>
                <Col>
                  <strong>{movieDetails?.Actors}</strong>
                </Col>
              </Row>
              <Row styles = {{ margin: 20}}>
                <Col span={12}>
                  <Statistic
                    title="IMDB Votes"
                    value={movieDetails?.imdbVotes}
                    prefix={<LikeOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Box Office Numbers"
                    value={movieDetails?.BoxOffice}
                  />
                </Col>
              </Row>
              
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default MovieCard;
